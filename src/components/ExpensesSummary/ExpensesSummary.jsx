import React from 'react'
import { formatCurrency } from '../../utils/calculations'
import styles from './ExpensesSummary.module.css'

const ExpensesSummary = ({ expenses, friends }) => {
  if (friends.length === 0) return null

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const hasExclusions = expenses.some(expense => expense.excluded && expense.excluded.length > 0)

  return (
    <div className={styles['expenses-summary']}>
      <div className={styles['summary-item']}>
        <span>Total gastado:</span>
        <span>{formatCurrency(totalExpenses)}</span>
      </div>
      {!hasExclusions && (
        <div className={styles['summary-item']}>
          <span>Por persona:</span>
          <span>{formatCurrency(totalExpenses / friends.length)}</span>
        </div>
      )}
    </div>
  )
}

export default ExpensesSummary 