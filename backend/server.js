const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ---- Mock Database ----
let activities = [];
let users = [
  { id: 1, role: "student", name: "Demo Student" },
  { id: 2, role: "admin", name: "Institute Admin" },
  { id: 3, role: "recruiter", name: "Recruiter" }
];

// ---- Auth (Simple) ----
app.post("/login", (req, res) => {
  const { role } = req.body;
  const user = users.find(u => u.role === role);
  if (!user) return res.status(401).json({ message: "Invalid role" });
  res.json(user);
});

// ---- Student adds activity ----
app.post("/student/activity", (req, res) => {
  const activity = {
    id: activities.length + 1,
    ...req.body,
    status: "Pending"
  };
  activities.push(activity);
  res.json({ message: "Activity submitted", activity });
});

// ---- Admin views all ----
app.get("/admin/activities", (req, res) => {
  res.json(activities);
});

// ---- Admin approves ----
app.post("/admin/approve/:id", (req, res) => {
  const act = activities.find(a => a.id == req.params.id);
  if (act) act.status = "Approved";
  res.json({ message: "Approved" });
});

// ---- Recruiter sees approved ----
app.get("/recruiter/activities", (req, res) => {
  res.json(activities.filter(a => a.status === "Approved"));
});

const PORT = process.env.PORT || 5000; // use host port if provided, else 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

