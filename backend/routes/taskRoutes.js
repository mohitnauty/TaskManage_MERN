const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/taskController");

router.post("/", ctrl.createTask);
router.get("/", ctrl.getAllTasks);
router.get("/:id", ctrl.getTask);
router.patch("/:id/status", ctrl.updateStatus);
router.delete("/:id", ctrl.deleteTask);
router.get("/:id/logs", ctrl.getLogs);

module.exports = router;