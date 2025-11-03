import React, { useState } from "react";
import CsvUpload from "./CsvUpload";
import RiskBreakdown from "./RiskBreakdown";
import NewsFeed from "./NewsFeed";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const logoURL = "/logo.png";
const backgroundImg = "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1200&q=80";

const cardAnim = { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 } };

const spendingData = {
  labels: ["Oct 1", "Oct 8", "Oct 15", "Oct 22", "Oct 29"],
  datasets: [
    {
      label: "Spending ($)",
      data: [100, 200, 150, 80, 230],
      fill: true,
      backgroundColor: "rgba(95,176,229,0.17)",
      borderColor: "#1ea6e8",
      tension: 0.3,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#2e83dd",
      pointRadius: 6,
      pointHoverRadius: 9,
      borderWidth: 3
    }
  ]
};
const spendingOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: "#238eba",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "#a0f1ff",
      borderWidth: 1.6,
      padding: 13
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: "#404040", font: { weight: 500 } },
      grid: { color: "#edf6fd" }
    },
    x: {
      ticks: { color: "#5f77a1", font: { weight: 600 } },
      grid: { color: "#f5f9ff" }
    }
  },
  animation: {
    duration: 1200,
    easing: "easeOutBounce"
  }
};

const TAB_LIST = [
  { id: "overview", label: "Overview" },
  { id: "risk", label: "Risk Score Breakdown" },
  { id: "news", label: "Live News Feed" },
  { id: "csv", label: "Upload Transactions" }
];

function Dashboard({ role }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        background: `linear-gradient(140deg, #e7f3ff 65%, #e3e7ed 100%), url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}
    >
      <img
        src={logoURL}
        alt="Company Logo"
        style={{
          position: "fixed",
          top: "8vh",
          right: "6vw",
          width: "130px",
          opacity: 0.13,
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          minHeight: "100vh",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          padding: "0 2vw"
        }}
      >
        {/* Tabs */}
        <nav style={{
          display:"flex",gap:"0.5em",margin:"2.2em 0 2.6em 0",
          justifyContent:"center",
          borderBottom:"2.5px solid #d5eaff"
        }}>
          {TAB_LIST.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id
                  ? "linear-gradient(90deg, #1ea6e8 80%, #c2f1f4 100%)"
                  : "transparent",
                color: activeTab === tab.id ? "#fff" : "#155476",
                border: "none",
                borderBottom: activeTab === tab.id ? "3px solid #13bfcf" : "3px solid transparent",
                borderRadius: "13px 13px 0 0",
                fontWeight:700,
                padding:"0.95em 2.2em",
                fontSize:"1.12em",
                cursor:"pointer",
                outline: "none",
                transition: "0.15s"
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        {/* Content */}
        {activeTab === "overview" && (
          <>
            <motion.div
              className="dashboard-cards"
              initial="initial"
              animate="animate"
              variants={cardAnim}
              transition={{ duration: 0.7 }}
              style={{
                display: "flex",
                gap: "2em",
                marginBottom: "2.5em",
                justifyContent: "center"
              }}
            >
              <motion.div whileHover={{ scale: 1.06, boxShadow: "0 3px 22px #59c6f6" }} style={cardStyle("#dbeafe", "#60a5fa")}>
                <h3 style={cardTitle}>Balance</h3>
                <p style={cardValue}>$5,600.00</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06, boxShadow: "0 3px 22px #f69aaf" }} style={cardStyle("#fef6fb", "#fda4af")}>
                <h3 style={cardTitle}>Fraud Alerts</h3>
                <p style={cardValue}>2 Active</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06, boxShadow: "0 3px 22px #68e7b6" }} style={cardStyle("#f3fdf6", "#6ee7b7")}>
                <h3 style={cardTitle}>Risk Score</h3>
                <p style={cardValue}>Low</p>
              </motion.div>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              variants={cardAnim}
              transition={{ duration: 0.8, delay: 0.08 }}
              style={{
                background: "linear-gradient(135deg, #f4f7fa 80%, #b7e7fe 100%)",
                borderRadius: "18px",
                boxShadow: "0 4px 24px #cff1fa71",
                padding: "1.4em",
                minHeight: "400px",
                marginBottom:"2em"
              }}
            >
              <h2 style={{ marginTop: 0 }}>Spending Over Time</h2>
              <div style={{ width: "100%", maxWidth: "510px", margin: "0.5em auto" }}>
                <Line data={spendingData} options={spendingOptions} />
              </div>
            </motion.div>
          </>
        )}
        {activeTab === "risk" && (
          <RiskBreakdown />
        )}
        {activeTab === "news" && (
          <NewsFeed />
        )}
        {activeTab === "csv" && (
          <CsvUpload />
        )}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            background: "linear-gradient(90deg,#eff3ff 66%,#e8fced 100%)",
            color: "#3662ac",
            margin: "3.2em auto 0 auto",
            padding: "2.2em 1.2em",
            borderRadius: "13px",
            maxWidth: "900px",
            textAlign: "center",
            fontSize: "1.13em",
            fontWeight: 500,
            boxShadow: "0 2px 18px #cff1fa44"
          }}
        >
          <h3 style={{ marginTop: 0 }}>About SecurePath</h3>
          SecurePath helps you instantly detect and prevent fraud. We use AI and real-time analytics to safeguard your finances and make digital banking smarter and more secure for everyone.
        </motion.section>
      </div>
    </div>
  );
}

function cardStyle(gradFrom, gradTo) {
  return {
    background: `linear-gradient(130deg, ${gradFrom} 90%, ${gradTo} 100%)`,
    borderRadius: "17px",
    boxShadow: "0 2.5px 17px #e6f1f780",
    padding: "1.85em 2em",
    minWidth: "180px",
    fontWeight: 700,
    textAlign: "center",
    transition: "box-shadow .22s, transform .22s"
  };
}
const cardTitle = {
  fontWeight: 800,
  marginBottom: ".3em",
  color: "#333"
};
const cardValue = {
  fontSize: "1.45em",
  fontWeight: 600,
  letterSpacing: ".01em"
};

export default Dashboard;
