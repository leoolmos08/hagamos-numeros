import React from 'react'

const ExpenseCard = ({ expense, friends, removeExpense, formatCurrency }) => {
  const participants = friends.filter(f => !(expense.excluded || []).includes(f))
  const amountPerPerson = participants.length > 0 ? Math.round(expense.amount / participants.length) : 0
  const excluded = (expense.excluded || []).length > 0 ? (expense.excluded || []) : []

  return (
    <div className="expense-item" style={{
      background: '#fff',
      border: '1.5px solid #e5e7eb',
      borderRadius: 16,
      boxShadow: '0 2px 8px 0 rgba(30,41,59,0.04)',
      padding: '1.1rem 1.2rem 0.8rem 1.2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 0
    }}>
      <div style={{display: 'flex', width: '100%', gap: 8}}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0}}>
          <span style={{fontWeight: 700, fontSize: 17, color: '#334155', marginBottom: 2, wordBreak: 'break-word'}}>{expense.description}</span>
          <span style={{fontWeight: 600, color: '#16a34a', fontSize: 16}}>{formatCurrency(expense.amount)}</span>
        </div>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: 0, marginTop: 10}}>
          <span style={{color: '#64748b', fontSize: 14, fontWeight: 500, textAlign: 'center'}}>
            ({formatCurrency(amountPerPerson)} c/u)
          </span>
          <span style={{color: '#64748b', fontSize: 13, textAlign: 'center', display: 'flex', alignItems: 'center', gap: 4}}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 2}}><circle cx="10" cy="7" r="3.2" stroke="#64748b" strokeWidth="1.2"/><path d="M3.5 16c0-2.5 2.5-4 6.5-4s6.5 1.5 6.5 4" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/></svg>
            {participants.length}
          </span>
        </div>
        <div style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 6, minWidth: 0}}>
          <button 
            className="expense-delete-btn"
            onClick={() => removeExpense(expense.id)}
            title="Eliminar gasto"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
        </div>
      </div>
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 8}}>
        <span style={{display: 'flex', alignItems: 'center', gap: 4, color: '#64748b', fontSize: 15}}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 2}}><rect x="2" y="5" width="16" height="10" rx="2" stroke="#64748b" strokeWidth="1.5"/><circle cx="10" cy="10" r="2.5" stroke="#64748b" strokeWidth="1.2"/></svg>
          <b style={{color: '#334155'}}>{expense.paidBy}</b>
        </span>
        {excluded.length > 0 ? (
          <span style={{color: '#f87171', fontSize: 13, fontWeight: 500, textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120}}>
            Excluidos: {excluded.join(', ')}
          </span>
        ) : (
          <span style={{color: '#94a3b8', fontSize: 13, fontWeight: 500}}>
            Pagan todos
          </span>
        )}
      </div>
    </div>
  )
}

export default ExpenseCard 