import React, { useState } from "react";

export default function CsvUploader() {
  const [file, setFile] = useState(null);
  const [task, setTask] = useState("auto");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a CSV file!");
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("task", task);

    try {
      const response = await fetch("http://localhost:5000/api/analyze_csv", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 16, maxWidth: 500, margin: "auto" }}>
      <h2>Machine Learning CSV Analyzer</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Task:{" "}
            <select value={task} onChange={handleTaskChange}>
              <option value="auto">Auto detect</option>
              <option value="regression">Regression</option>
              <option value="classification">Classification</option>
              <option value="fraud">Fraud / Anomaly</option>
            </select>
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Submit"}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: 24 }}>
          <h3>Result:</h3>
          <pre
            style={{
              background: "#f8f8f8",
              padding: 16,
              borderRadius: 8,
              maxHeight: 350,
              overflow: "auto",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
