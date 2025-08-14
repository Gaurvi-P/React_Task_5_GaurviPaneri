// Simple equal-split balance calculator
// members: array of strings
// expenses: array of { amount: number, paidBy: string, participants: string[] }
export function calculateBalances(members = [], expenses = []) {
  // Use numbers with 2 decimals. We'll operate in floating numbers but round final values.
  const balances = {};
  members.forEach((m) => (balances[m] = 0));

  expenses.forEach((exp) => {
    const { amount, paidBy, participants } = exp;
    if (!participants || participants.length === 0) return;
    const share = amount / participants.length;
    participants.forEach((p) => {
      if (!(p in balances)) balances[p] = 0;
      balances[p] -= Math.round(share * 100) / 100;
    });
    if (!(paidBy in balances)) balances[paidBy] = 0;
    balances[paidBy] += Math.round(amount * 100) / 100;
  });

  // round to 2 decimals to keep UI tidy (and avoid -0)
  Object.keys(balances).forEach((k) => {
    balances[k] = Math.round((balances[k] + Number.EPSILON) * 100) / 100;
    if (Math.abs(balances[k]) === 0) balances[k] = 0;
  });

  return balances;
}