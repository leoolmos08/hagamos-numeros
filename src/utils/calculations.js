export const formatCurrency = (value) => {
  if (value === '' || value === undefined) return ''
  const number = Number(value)
  if (isNaN(number)) return ''
  return number.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })
}

export const parseCurrencyToNumber = (value) => {
  if (!value) return ''
  const clean = value.replace(/[^\d]/g, '')
  return clean ? Number(clean) : ''
}

export const calculateSplits = (expenses, friends) => {
  const balances = {}
  friends.forEach(friend => {
    balances[friend] = 0
  })

  friends.forEach(friend => {
    let debePagar = 0
    let pago = 0
    expenses.forEach(expense => {
      const participants = friends.filter(f => !(expense.excluded || []).includes(f))
      if (participants.includes(friend)) {
        debePagar += expense.amount / participants.length
      }
      if (expense.paidBy === friend && participants.includes(friend)) {
        pago += expense.amount
      }
    })
    balances[friend] = Math.round(pago - debePagar)
  })
  return balances
}

export const getSettlements = (expenses, friends) => {
  const balances = calculateSplits(expenses, friends)
  const settlements = []
  
  let debtors = Object.entries(balances)
    .filter(([_, balance]) => balance < -1)
    .map(([name, balance]) => ({ name, balance }))
    .sort((a, b) => a.balance - b.balance)
  let creditors = Object.entries(balances)
    .filter(([_, balance]) => balance > 1)
    .map(([name, balance]) => ({ name, balance }))
    .sort((a, b) => b.balance - a.balance)

  while (debtors.length && creditors.length) {
    let debtor = debtors[0]
    let creditor = creditors[0]
    const amount = Math.min(Math.abs(debtor.balance), creditor.balance)
    if (amount < 1) break
    settlements.push({
      from: debtor.name,
      to: creditor.name,
      amount: formatCurrency(amount)
    })
    debtor.balance += amount
    creditor.balance -= amount
    if (Math.abs(debtor.balance) < 1) debtors.shift()
    if (creditor.balance < 1) creditors.shift()
    debtors.sort((a, b) => a.balance - b.balance)
    creditors.sort((a, b) => b.balance - a.balance)
  }
  return settlements
} 