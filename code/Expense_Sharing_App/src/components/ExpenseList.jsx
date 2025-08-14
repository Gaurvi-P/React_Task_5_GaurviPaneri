import React from "react";
import { FaHistory } from "react-icons/fa";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

export default function ExpenseList({ expenses = [] }) {
  return (
    <div className="card">
        <h2><FaHistory /> Expense History</h2>
        {expenses.length === 0 && <div className="muted">No expenses yet</div>}

        {expenses.length > 0 && (
            <table className="expenses-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Paid By</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Participants</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((e) => (
                        <tr key={e.id}>
                            <td><strong>{e.description}</strong></td>
                            <td>{e.paidBy}</td>
                            <td>{formatDate(e.createdAt)}</td>
                            <td>₹ {Number(e.amount).toFixed(2)}</td>
                            <td>{e.participants.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
);
}