import React from 'react'
import { formatCurrency } from '../../utils/calculations'

const ExpenseCard = ({ expense, friends, removeExpense, formatCurrency }) => {
  const participants = friends.filter(f => !(expense.excluded || []).includes(f))
  const amountPerPerson = participants.length > 0 ? Math.round(expense.amount / participants.length) : 0
  const excluded = (expense.excluded || []).length > 0 ? (expense.excluded || []) : []

  return (
    <div className="expense-item">
      <div className="expense-info">
        <div className="expense-desc">{expense.description}</div>
        <div className="expense-meta">
          Pagado por: {expense.paidBy}
          {expense.excluded && expense.excluded.length > 0 && (
            <span style={{ color: '#f87171' }}>
              (Excluidos: {expense.excluded.join(', ')})
            </span>
          )}
        </div>
      </div>
      <div className="expense-amount">{formatCurrency(expense.amount)}</div>
      <button
        className="expense-delete-btn"
        onClick={() => removeExpense(expense.id)}
        title="Eliminar gasto"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  )
}

export default ExpenseCard 