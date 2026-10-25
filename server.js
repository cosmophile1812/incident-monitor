const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Basic health-check endpoint
app.get("/", (req, res) => {
  res.json({
    project: "Sentinel",
    message: "Incident Monitoring API is running!",
    status: "OK"
  });
});

// Temporary in-memory events for the first test
const events = [];

app.get("/api/events", (req, res) => {
  res.json(events);
});

app.post("/api/events", (req, res) => {
  const { service, message, severity = "LOW" } = req.body;

  if (!service || !message) {
    return res.status(400).json({
      error: "Both service and message are required."
    });
  }

  const event = {
    id: events.length + 1,
    service,
    message,
    severity,
    timestamp: new Date().toISOString()
  };

  events.push(event);
  res.status(201).json(event);
});

app.listen(PORT, () => {
  console.log(`Sentinel API running at http://localhost:${PORT}`);
});