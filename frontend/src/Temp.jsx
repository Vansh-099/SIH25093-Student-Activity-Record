import React, { useState, useEffect, useRef } from "react";
import "./index.css";

export default function Temp() {
  const [user, setUser] = useState(null);
const [login, setLogin] = useState({ name: "", role: "student" });

useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser) setUser(savedUser);
}, []);

const handleLogin = () => {
  if (!login.name) return alert("Enter name");
  localStorage.setItem("user", JSON.stringify(login));
  setUser(login);
};

const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);
};

  const [page, setPage] = useState("home");
  const lastItemRef = useRef();

  // Student Activities
  const [studentActivities, setStudentActivities] = useState(() => {
    return JSON.parse(localStorage.getItem("studentActivities")) || [
      { title: "Hackathon Winner", date: "2026-01-10", description: "Won inter-college hackathon" },
      { title: "Coding Workshop", date: "2025-12-20", description: "Attended full-stack workshop" },
      { title: "AI Project", date: "2025-11-15", description: "Built AI chatbot project" },
      { title: "React Bootcamp", date: "2025-10-05", description: "Completed React frontend bootcamp" },
      { title: "Internship 1", date: "2025-11-06", description: "Completed internship of 2 months" },
    ];
  });

  // Admin Activities
  const [adminActivities, setAdminActivities] = useState(() => {
    return JSON.parse(localStorage.getItem("adminActivities")) || [
      { title: "Hackathon Winner", date: "2026-01-10", description: "Won inter-college hackathon", verified: true },
      { title: "Coding Workshop", date: "2025-12-20", description: "Attended full-stack workshop", verified: false },
      { title: "AI Project", date: "2025-11-15", description: "Built AI chatbot project", verified: true },
      { title: "React Bootcamp", date: "2025-10-05", description: "Completed React frontend bootcamp", verified: true },
    ];
  });

  // Recruiter Records
  const [recruiterRecords, setRecruiterRecords] = useState(() => {
    return JSON.parse(localStorage.getItem("recruiterRecords")) || [
      { title: "Hackathon Winner", date: "2026-01-10", description: "Won inter-college hackathon" },
      { title: "AI Project", date: "2025-11-15", description: "Built AI chatbot project" },
    ];
  });

  // Persist in localStorage
  useEffect(() => {
    localStorage.setItem("studentActivities", JSON.stringify(studentActivities));
  }, [studentActivities]);

  useEffect(() => {
    localStorage.setItem("adminActivities", JSON.stringify(adminActivities));
  }, [adminActivities]);

  useEffect(() => {
    localStorage.setItem("recruiterRecords", JSON.stringify(recruiterRecords));
  }, [recruiterRecords]);

  // Scroll to last item
  useEffect(() => {
    lastItemRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [studentActivities]);

  // Form state for new activity
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const submitStudentActivity = () => {
    if (!newTitle || !newDesc) return alert("Please fill title & description!");
    const newActivity = {
      title: newTitle,
      date: new Date().toISOString().split("T")[0],
      description: newDesc,
    };
    setStudentActivities([...studentActivities, newActivity]);
    setNewTitle("");
    setNewDesc("");
  };
  if (!user) {
  return (
    <div className="login-page">
      <h1 className="site-title">Student Activity Hub</h1>

      <div className="login-card">
        <input
          placeholder="Enter name"
          value={login.name}
          onChange={(e) => setLogin({ ...login, name: e.target.value })}
        />

        <select
          value={login.role}
          onChange={(e) => setLogin({ ...login, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
  }

  return (
    <div className="container">
      <h1 className="site-title">Student Activity Hub</h1>
      <p className="site-subtitle">Centralized Platform for Verified Student Records</p>

      {/* Navigation */}
      <div className="card nav-card">
        <button onClick={() => setPage("student")}>Student</button>
        <button onClick={() => setPage("admin")}>Admin</button>
        <button onClick={() => setPage("recruiter")}>Recruiter</button>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={handleLogout}>Logout</button>

      </div>

      {/* Home */}
      {page === "home" && (
  <div className="home-content">
    <div className="card">
      <h2>Welcome to Student Activity Hub</h2>
      <p>Explore verified student activities, showcase achievements, and manage records efficiently.</p>
    </div>

    <div className="card">
      <h2>Why Use This Platform?</h2>
      <ul>
        <li>Centralized record of all student activities</li>
        <li>Easy verification by admins</li>
        <li>Accessible to recruiters for transparency</li>
      </ul>
    </div>

    <div className="card">
      <h2>Key Features</h2>
      <ul>
        <li>Submit and track activities</li>
        <li>Admin dashboard for verification</li>
        <li>Recruiter access to verified achievements</li>
        <li>Responsive and interactive interface</li>
      </ul>
    </div>

    <div className="card">
      <h2>Get Started</h2>
      <p>Click the buttons above to navigate as Student, Admin, or Recruiter. Start exploring the activities today!</p>
    </div>

    <div className="card">
      <h2>Contact / Support</h2>
      <p>For feedback or issues, contact your college admin or email <strong>support@studenthub.edu</strong>.</p>
    </div>
  </div>
)}

      {/* Student */}
      {page === "student" && (
        <div className="card">
          <h2>Student Dashboard</h2>

          {/* Form to add new activity */}
          <div className="activity-form">
            <input
              type="text"
              placeholder="Activity Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
            <button onClick={submitStudentActivity}>Submit Activity</button>
          </div>

          <h3>Submitted Activities:</h3>
          <ul>
            {studentActivities.map((act, idx) => (
              <li key={idx} ref={idx === studentActivities.length - 1 ? lastItemRef : null}>
                {act.title} — {act.date} : {act.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Admin */}
      {page === "admin" && (
        <div className="card">
          <h2>Admin Dashboard</h2>
          <ul>
            {adminActivities.map((act, idx) => (
              <li key={idx}>
                {act.title} — {act.date} : {act.description} | {act.verified ? "Verified" : "Pending"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recruiter */}
      {page === "recruiter" && (
        <div className="card">
          <h2>Recruiter Dashboard</h2>
          <ul>
            {recruiterRecords.map((act, idx) => (
              <li key={idx}>
                {act.title} — {act.date} : {act.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="footer">© 2026 | Student Activity Hub Prototype</p>
    </div>
  );
}
