// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Alerts from "./components/Alerts";
import Profile from "./components/Profile";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import LiveAlerts from "./components/LiveAlerts";
import RiskBreakdown from "./components/RiskBreakdown";
import NewsFeed from "./components/NewsFeed";
import RiskQuiz from "./components/RiskQuiz";
import FaqPage from "./components/FaqPage";
import CsvUpload from "./components/CsvUpload"; // <--- Add this

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("user");

  return (
    <Router>
      {loggedIn && <Navbar setLoggedIn={setLoggedIn} />}
      <Routes>
        <Route path="/login" element={
          loggedIn
            ? <Navigate to="/" />
            : <Login onLogin={r => { setLoggedIn(true); setRole(r); }} />
        } />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/live-alerts" element={<LiveAlerts />} />
        <Route path="/risk-breakdown" element={<RiskBreakdown />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/self-assessment" element={<RiskQuiz />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/ml-uploader" element={loggedIn ? <CsvUploader /> : <Navigate to="/login" />} /> {/* ML upload route */}
        <Route path="/" element={loggedIn ? <Dashboard role={role} /> : <Navigate to="/login" />} />
        <Route path="/transactions" element={loggedIn ? <Transactions role={role} /> : <Navigate to="/login" />} />
        <Route path="/alerts" element={loggedIn ? <Alerts role={role} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={loggedIn ? <Profile role={role} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
