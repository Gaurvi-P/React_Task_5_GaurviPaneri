import React, { useState } from "react";
import { GrMoney } from "react-icons/gr";

export default function ExpenseForm({ members, addExpense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [participants, setParticipants] = useState([]);
  const [msg, setMsg] = useState("");
  const [date, setDate] = useState(""); 

  // keep paidBy default if members present
  React.useEffect(() => {
    if (members.length && !paidBy) setPaidBy(members[0]);
  }, [members]);

  const toggleParticipant = (name) => {
    setParticipants((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));
  };

  const submit = () => {
    const res = addExpense({ description, amount, paidBy, participants });
    if (!res.ok) {
      setMsg(res.message);
      return;
    }
    setDescription("");
    setAmount("");
    setParticipants([]);
    setMsg("Expense added");
    setTimeout(() => setMsg(""), 1500);
  };

  return (
    <div className="card">
  <h2><GrMoney /> Add Expense</h2>
  <div className="form-col">
    
    {/* Description */}
    <label htmlFor="description">Expense Description</label>
    <input
      id="description"
      type="text"
      placeholder="e.g. Dinner at ABC Restaurant"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    {/* Amount */}
    <label htmlFor="amount">Amount (₹)</label>
    <input
      id="amount"
      type="number"
      step="0.01"
      placeholder="e.g. 1200.50"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
    <small className="muted">Enter the total expense amount.</small>

    {/* Paid By */}
    <label htmlFor="paidBy">Paid By</label>
    <select
      id="paidBy"
      value={paidBy}
      onChange={(e) => setPaidBy(e.target.value)}
    >
      {members.map((m) => (
        <option key={m} value={m}>{m}</option>
      ))}
    </select>

    {/* Participants */}
    <div className="participants">
      <label>Participants (selected will share equally)</label>
      <div className="chips">
        {members.map((m) => (
          <label className="chip" key={m}>
            <input
              type="checkbox"
              checked={participants.includes(m)}
              onChange={() => toggleParticipant(m)}
            />
            {m}
          </label>
        ))}
        {members.length === 0 && (
          <div className="muted">
            Add members first to select participants.
          </div>
        )}
      </div>
    </div>

    {/* Optional Date */}
    <label htmlFor="date">Expense Date</label>
    <input
      id="date"
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />

    {/* Submit */}
    <div style={{ marginTop: 8 }}>
      <button className="btn" onClick={submit}>Add Expense</button>
      {msg && (
        <span className="muted" style={{ marginLeft: 8 }}>{msg}</span>
      )}
    </div>
  </div>
</div>
  );
}