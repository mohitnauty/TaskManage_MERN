const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");
const { isValidTransition } = require("../utils/statusValidator");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = await Task.create({ title, description });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

exports.getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
};


exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // prevent same status
    if (task.status === status) {
      return res.status(400).json({ error: "Already in same status" });
    }

    // validate transition
    if (!isValidTransition(task.status, status)) {
      return res.status(400).json({
        error: `Invalid transition from ${task.status} to ${status}`
      });
    }

    // log entry
    await ActivityLog.create({
      taskId: task._id,
      previousStatus: task.status,
      newStatus: status
    });

    // update task
    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

exports.getLogs = async (req, res) => {
  try {
    const { id } = req.params;

    // fetch logs for this task
    const logs = await ActivityLog.find({ taskId: id })
      .sort({ changedAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};