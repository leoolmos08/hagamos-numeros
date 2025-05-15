import React from 'react'

const ExpenseForm = ({
  newExpense,
  setNewExpense,
  friends,
  addExpense,
  formatCurrency,
  handleAmountChange,
  showExcludeList,
  setShowExcludeList
}) => (
  <div className="expense-form">
    <input
      type="text"
      value={newExpense.description}
      onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
      placeholder="Descripción del gasto"
    />
    <input
      type="text"
      inputMode="numeric"
      value={formatCurrency(newExpense.amount)}
      onChange={handleAmountChange}
      placeholder="Monto"
      min="0"
      autoComplete="off"
      maxLength={10}
    />
    <div style={{width: '100%'}}>
      <div style={{fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.3rem', fontSize: '0.98rem'}}>
        ¿Quién pagó?
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem'}}>
        {friends.length === 0 && (
          <span style={{color: 'var(--text-secondary)', fontSize: '0.95rem'}}>Agrega amigos para elegir quién pagó</span>
        )}
        {friends.map(friend => (
          <button
            key={friend}
            type="button"
            onClick={() => setNewExpense({...newExpense, paidBy: friend})}
            style={{
              background: newExpense.paidBy === friend ? 'var(--primary-color)' : 'var(--background)',
              color: newExpense.paidBy === friend ? 'white' : 'var(--text-primary)',
              border: '1.5px solid ' + (newExpense.paidBy === friend ? 'var(--primary-color)' : 'var(--border-color)'),
              borderRadius: '2rem',
              padding: '0.5rem 1.2rem',
              fontWeight: 500,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: newExpense.paidBy === friend ? '0 2px 8px #6366f133' : 'none',
            }}
          >
            {friend}
          </button>
        ))}
      </div>
    </div>
    <div style={{width: '100%', marginTop: '1rem'}}>
      <button
        type="button"
        onClick={() => setShowExcludeList(v => !v)}
        style={{
          width: '100%',
          background: 'none',
          color: 'var(--text-primary)',
          border: 'none',
          borderRadius: 0,
          padding: '0.3rem 0',
          fontWeight: 500,
          fontSize: '1rem',
          cursor: 'pointer',
          marginBottom: 0,
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10
        }}
      >
        {newExpense.excluded.length > 0
          ? `Excluidos: ${newExpense.excluded.join(', ')}`
          : 'Excluir personas (opcional)'}
        <span style={{fontSize: 18, color: '#64748b'}}>{showExcludeList ? '▲' : '▼'}</span>
      </button>
      <div style={{borderBottom: '1px solid #e5e7eb', marginBottom: showExcludeList ? '0.5rem' : '0.5rem'}} />
      {showExcludeList && (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.3rem'}}>
          {friends.map(friend => (
            <button
              key={friend}
              type="button"
              onClick={() => {
                const newExcluded = newExpense.excluded.includes(friend)
                  ? newExpense.excluded.filter(f => f !== friend)
                  : [...newExpense.excluded, friend]
                setNewExpense({...newExpense, excluded: newExcluded})
              }}
              style={{
                background: newExpense.excluded.includes(friend) ? '#f87171' : 'var(--background)',
                color: newExpense.excluded.includes(friend) ? 'white' : 'var(--text-primary)',
                border: '1.5px solid ' + (newExpense.excluded.includes(friend) ? '#f87171' : 'var(--border-color)'),
                borderRadius: '2rem',
                padding: '0.5rem 1.2rem',
                fontWeight: 500,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {friend}
            </button>
          ))}
        </div>
      )}
    </div>
    <button onClick={addExpense}>Agregar Gasto</button>
  </div>
)

export default ExpenseForm 