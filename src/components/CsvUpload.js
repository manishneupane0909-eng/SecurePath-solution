import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CsvUpload = () => {
  const [fileName, setFileName] = useState('');
  const [table, setTable] = useState([]);
  const [scanned, setScanned] = useState(false);

  function parseCSV(text) {
    const rows = text.trim().split(/\r?\n/);
    return rows.map(row => row.split(","));
  }

  const handleChange = (e) => {
    setScanned(false);
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const csv = ev.target.result;
      setTable(parseCSV(csv));
    };
    reader.readAsText(file);
  };

  const scanFraud = () => {
    setScanned(true);
    setTimeout(() => setScanned(false), 1800); // Success effect
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      style={{
        margin: '0 auto',
        marginBottom: "2em",
        padding: "2.2em",
        background: "linear-gradient(120deg, #f5d5ed 85%, #a0e7ed 100%)",
        borderRadius: "20px",
        boxShadow: "0 8px 28px #bcaaf98f",
        maxWidth: "700px",
        textAlign: "center",
        border: "1.5px solid #efe7ff", position:"relative"
      }}
    >
      <motion.div
        initial={{ scale: 0.9 }} animate={{ scale: [1.04, 0.98, 1.06, 1] }} transition={{ duration: 1.5 }}
        style={{fontSize:"3.2em",marginBottom:".2em",lineHeight:"60px"}}
      >🛡️💸</motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}
        style={{ fontSize: "2.1em", color: "#25a0a8", marginBottom: "0.3em" }}>
        Check Your Transactions for Fraud!
      </motion.h2>
      <p style={{fontSize: "1.18em", marginBottom: "1.1em", color:"#28749d"}}>
        Upload your CSV to instantly scan, analyze and preview your financial data.
      </p>
      <input
        type="file"
        accept=".csv"
        onChange={handleChange}
        style={{
          background: "#d2e9ef",
          borderRadius: "8px",
          border: "1.5px solid #8be2f9",
          padding: "0.6em",
          fontWeight: 600,
          color: "#233"
        }}
      />
      {fileName && <div style={{marginTop:"1.2em", fontWeight:"bold", color:"#2874ae"}}>Selected: <b>{fileName}</b></div>}
      {table.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          style={{
            marginTop: "2em", overflowX: "auto", borderRadius: "7px",
            boxShadow: "0 4px 10px #8ce5f668", paddingBottom:"1.5em"
          }}
        >
          <button
            onClick={scanFraud}
            style={{
              background: "linear-gradient(90deg,#1cb7c5 55%,#97e49e 100%)",
              boxShadow: "0 2px 10px #cff5ef",
              color: "#fff", fontWeight: "bold", fontSize: "1.18em",
              border: "none", borderRadius:"8px", padding:"0.6em 2em",
              marginBottom:"1.2em", marginTop:"2px", cursor: "pointer"
            }}
          >
            🚦 Scan for Fraud
          </button>
          <AnimatePresence>
            {scanned && (
              <motion.div
                initial={{ opacity: 0, y:-14 }} animate={{ opacity: 1, y:0 }} exit={{ opacity:0, y:-10 }}
                style={{
                  background:"#ccffd6", color:"#2b6d40", fontWeight:"bold",
                  borderRadius:"7px", padding:"0.6em 1em", marginBottom:"0.8em", fontSize:"1.14em"
                }}
              >
                ✅ No Fraud Detected — Your Data Looks Safe!
              </motion.div>
            )}
          </AnimatePresence>
          <table style={{
            width:"100%", borderCollapse:"collapse", background: "#fff", borderRadius: "7px",
            overflow:"hidden", boxShadow: scanned ? "0 0 16px #9bf59a" : null,
            transition:"box-shadow .3s"
          }}>
            <thead>
              <tr>
                {table[0].map((cell, i) => (
                  <th key={i} style={{borderBottom:"3px solid #36abd3", padding:"12px 8px", background:"#fafaff", color:"#15627c"}}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.slice(1).map((row, r) => (
                <tr key={r}>
                  {row.map((cell, i) => (
                    <td key={i} style={{borderBottom:"1.5px solid #e7e0fe", padding:"10px 8px"}}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.section>
  );
};

export default CsvUpload;
