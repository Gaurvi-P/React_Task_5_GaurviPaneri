import React, { useState, useEffect } from "react";
import MembersList from "./components/MemberList";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BalanceSheet from "./components/BalanceSheet";
import { calculateBalances } from "./utils";
import "./App.css";

const LS_MEMBERS = "es_members_v1";
const LS_EXPENSES = "es_expenses_v1";

export default function App() {
  const [members, setMembers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_MEMBERS)) || [];
    } catch {
      return [];
    }
  });
  const [expenses, setExpenses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_EXPENSES)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_MEMBERS, JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem(LS_EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  const addMember = (name) => {
    const trimmed = (name || "").trim();
    if (!trimmed) return { ok: false, message: "Name empty" };
    if (members.includes(trimmed)) return { ok: false, message: "Member exists" };
    setMembers((m) => [...m, trimmed]);
    return { ok: true };
  };

  const removeMember = (name) => {
    setMembers((m) => m.filter((x) => x !== name));
    setExpenses((ex) =>
      ex.map((e) => ({
        ...e,
        participants: e.participants.filter((p) => p !== name),
      }))
    );
  };

  const addExpense = ({ description, amount, paidBy, participants }) => {
    const amt = Number(amount);
    if (!description || !paidBy || !participants || participants.length === 0) {
      return { ok: false, message: "Fill all fields & choose participants" };
    }
    if (Number.isNaN(amt) || amt <= 0) return { ok: false, message: "Enter valid amount" };
    const newExp = {
      id: Date.now().toString(),
      description,
      amount: Math.round(amt * 100) / 100,
      paidBy,
      participants,
      createdAt: new Date().toISOString(),
    };
    setExpenses((e) => [newExp, ...e]);
    return { ok: true };
  };

  const clearAll = () => {
    if (!confirm("Clear all members and expenses? This cannot be undone.")) return;
    setMembers([]);
    setExpenses([]);
    localStorage.removeItem(LS_MEMBERS);
    localStorage.removeItem(LS_EXPENSES);
  };

  const balances = calculateBalances(members, expenses);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💰 Expense Sharing App</h1>
      </header>

      <div className="card">
        <MembersList members={members} addMember={addMember} removeMember={removeMember} />
      </div>

      <div className="card">
        <ExpenseForm members={members} addExpense={addExpense} />
      </div>

      <div className="card">
        <BalanceSheet balances={balances} />
      </div>

      <div className="card">
        <ExpenseList expenses={expenses} />
      </div>

      <div className="card center">
        <button className="btn danger" onClick={clearAll}>
          Clear All Data
        </button>
      </div>

      <footer className="app-footer">
        <small>&copy; 2025.All rights reserved.</small>
      </footer>
    </div>
  );
}