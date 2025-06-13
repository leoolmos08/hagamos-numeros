import React, { useState, useEffect } from 'react'
import { formatCurrency, getSettlements } from '../../utils/calculations'

const ExpensesManager = ({ friends }) => {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem('expenses')
    return stored ? JSON.parse(stored) : []
  })
  const [showExcludeList, setShowExcludeList] = useState(false)
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    paidBy: '',
    participants: [],
    excluded: []
  })

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.paidBy) {
      return false
    }
    setExpenses([...expenses, {
      ...newExpense,
      amount: Number(newExpense.amount),
      participants: friends.filter(friend => !(newExpense.excluded || []).includes(friend)),
      id: Date.now()
    }])
    setNewExpense({
      description: '',
      amount: '',
      paidBy: '',
      participants: [],
      excluded: []
    })
    return true
  }

  const removeExpense = (expenseId) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId))
  }

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, '')
    setNewExpense({
      ...newExpense,
      amount: raw
    })
  }

  const settlements = getSettlements(expenses, friends)

  return {
    expenses,
    newExpense,
    setNewExpense,
    showExcludeList,
    setShowExcludeList,
    addExpense,
    removeExpense,
    handleAmountChange,
    settlements
  }
}

export default ExpensesManager 