import { useEffect, useState } from "react";
import API from "../api/api";

// MUI Imports
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Box,
  Stack,
  CircularProgress
} from "@mui/material";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [logs, setLogs] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/";
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title) return alert("Enter title");
    setLoading(true);
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await API.patch(`/tasks/${id}/status`, { status });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const improveTask = async (id) => {
    setLoading(true);
    await API.post(`/tasks/${id}/improve`);
    fetchTasks();
    setLoading(false);
  };

  const toggleLogs = async (id) => {
    if (logs[id]) {
      setLogs({ ...logs, [id]: null });
    } else {
      const res = await API.get(`/tasks/${id}/logs`);
      setLogs({ ...logs, [id]: res.data });
    }
  };

  const getStatusColor = (status) => {
    if (status === "TODO") return "warning";
    if (status === "IN_PROGRESS") return "info";
    if (status === "DONE") return "success";
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task Manager Dashboard
      </Typography>

      {/* Create Task */}
      <Stack direction="row" spacing={2} mb={4}>
        <TextField
          label="Enter task title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={createTask}>
          {loading ? <CircularProgress size={20} color="inherit" /> : "Add"}
        </Button>
      </Stack>

      {/* Task List */}
      {tasks.length === 0 ? (
        <Typography>No tasks yet</Typography>
      ) : (
        tasks.map((t) => (
          <Card key={t._id} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">{t.title}</Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {t.description}
              </Typography>

              <Chip
                label={t.status}
                color={getStatusColor(t.status)}
                sx={{ mb: 2 }}
              />

              {/* Actions */}
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {t.status === "TODO" && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => updateStatus(t._id, "IN_PROGRESS")}
                  >
                    Start
                  </Button>
                )}

                {t.status === "IN_PROGRESS" && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => updateStatus(t._id, "DONE")}
                  >
                    Complete
                  </Button>
                )}

                <Button
                  size="small"
                  variant="contained"
                  onClick={() => improveTask(t._id)}
                >
                  Improve
                </Button>

                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => deleteTask(t._id)}
                >
                  Delete
                </Button>

                <Button
                  size="small"
                  variant="text"
                  onClick={() => toggleLogs(t._id)}
                >
                  View Logs
                </Button>
              </Stack>

              {/* Logs */}
              {logs[t._id] && (
                <Box
                  mt={2}
                  p={2}
                  sx={{ background: "#f5f5f5", borderRadius: 2 }}
                >
                  <Typography variant="subtitle2">
                    Activity Logs:
                  </Typography>

                  {logs[t._id].length === 0 ? (
                    <Typography>No logs yet</Typography>
                  ) : (
                    logs[t._id].map((log) => (
                      <Typography key={log._id} variant="body2">
                        {log.previousStatus} → {log.newStatus} (
                        {new Date(log.changedAt).toLocaleString()})
                      </Typography>
                    ))
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}