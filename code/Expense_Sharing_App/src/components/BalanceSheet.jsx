import React from "react";
import { BiSolidSpreadsheet } from "react-icons/bi";

export default function BalanceSheet({ balances = {} }) {
    const entries = Object.entries(balances);
    const format = (v) => Number(v).toFixed(2);

    return (
        <div className="card">
            <h2><BiSolidSpreadsheet /> Balances</h2>
            {entries.length === 0 && <div className="muted">No members yet</div>}

            {entries.length > 0 && (
                <table className="balances-table">
                    <thead>
                        <tr>
                            <th>Member</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map(([name, bal]) => (
                            <tr key={name} className={bal > 0 ? "credit" : bal < 0 ? "debit" : ""}>
                                <td>{name}</td>
                                <td>
                                    {bal > 0
                                        ? `is owed ₹ ${format(bal)}`
                                        : bal < 0
                                        ? `owes ₹ ${format(Math.abs(bal))}`
                                        : "settled"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}