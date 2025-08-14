import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoPersonRemove } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";


export default function MembersList({ members, addMember, removeMember }) {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const onAdd = () => {
    const res = addMember(name);
    if (!res.ok) {
      setMsg(res.message);
      return;
    }
    setName("");
    setMsg("Member added");
    setTimeout(() => setMsg(""), 1500);
  };

  return (
    <div className="card">
      <h2> <IoPersonSharp /> Members</h2>
      <div className="form-row">
        <input
          placeholder="e.g. Alice"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
        />
        <button className="btn" onClick={onAdd}><IoPersonAddSharp />  Add</button>
      </div>
      {msg && <div className="muted">{msg}</div>}

      <ul className="members">
        {members.length === 0 && <li className="muted">No members yet</li>}
        {members.map((m) => (
          <li key={m}>
            <span>{m}</span>
            <button className="btn small" onClick={() => removeMember(m)}><IoPersonRemove /> Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}