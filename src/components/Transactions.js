import React from "react";
import { motion } from "framer-motion";
import "./Transactions.css";

const txns = [
  {date: "2025-10-25", desc: "Starbucks", amt: "$5.50", status: "Completed"},
  {date: "2025-10-24", desc: "Amazon", amt: "$49.99", status: "Completed"},
  {date: "2025-10-22", desc: "Bank Transfer", amt: "$250.00", status: "Flagged"},
];

function Transactions({ role }) {
  if(role==="admin") {
    return (
      <section className="transactions">
        <h2>All Customer Transactions</h2>
        <div>(Admin can filter, flag, or export data here)</div>
        {/* Add more admin-side components as desired */}
      </section>
    );
  }
  return (
    <motion.section className="transactions" initial={{x:30,opacity:0}} animate={{x:0,opacity:1}}>
      <h2>Recent Transactions</h2>
      <table>
        <thead>
          <tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th></tr>
        </thead>
        <tbody>
          {txns.map((t,i) => (
            <tr key={i}>
              <td>{t.date}</td>
              <td>{t.desc}</td>
              <td>{t.amt}</td>
              <td className={t.status.toLowerCase()}>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.section>
  );
}
export default Transactions;
