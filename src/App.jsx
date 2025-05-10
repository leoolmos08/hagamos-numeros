import { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import logoExport from './assets/logo-export.png'
import './App.css'

function formatCurrency(value) {
  if (value === '' || value === undefined) return ''
  const number = Number(value)
  if (isNaN(number)) return ''
  return number.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })
}

function parseCurrencyToNumber(value) {
  if (!value) return ''
  // Elimina todo lo que no sea número
  const clean = value.replace(/[^\d]/g, '')
  return clean ? Number(clean) : ''
}

function ResultadosExport({ settlements }) {
  return (
    <div style={{
      width: 350,
      padding: '2rem 1.5rem 1.5rem 1.5rem',
      background: '#fff',
      borderRadius: 18,
      fontFamily: 'Arial, sans-serif',
      color: '#222',
      boxShadow: '0 2px 12px 0 rgba(30,41,59,0.08)',
      border: '1.5px solid #e5e7eb',
      position: 'relative',
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18}}>
        <img src={logoExport} alt="Logo cuentas claras" style={{width: 38, height: 38, borderRadius: 8, background: '#fff'}} />
        <span style={{fontWeight: 700, fontSize: 22, color: '#334155'}}>Resultados</span>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18}}>
        {settlements.length === 0 && (
          <span style={{color: '#64748b', fontSize: 16}}>No hay resultados para mostrar.</span>
        )}
        {settlements.map((settlement, idx) => (
          <div key={idx} style={{
            background: '#f8fafc',
            borderRadius: 12,
            borderLeft: '4px solid #22c55e',
            padding: '0.7rem 1rem',
            color: '#334155',
            fontWeight: 600,
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{color: '#334155'}}>{settlement.from}</span>
            <span style={{fontWeight: 400}}>debe pagar</span>
            <span style={{color: '#16a34a', fontWeight: 700}}>{settlement.amount}</span>
            <span style={{fontWeight: 400}}>a</span>
            <span style={{color: '#334155'}}>{settlement.to}</span>
          </div>
        ))}
      </div>
      <div style={{textAlign: 'center', marginTop: 10, fontSize: 13, color: '#64748b', letterSpacing: 1}}>
        hagamosnumeros.com
      </div>
    </div>
  )
}

function App() {
  // Leer datos de localStorage al iniciar
  const [friends, setFriends] = useState(() => {
    const stored = localStorage.getItem('friends')
    return stored ? JSON.parse(stored) : []
  })
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem('expenses')
    return stored ? JSON.parse(stored) : []
  })
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    paidBy: '',
    participants: []
  })
  const [newFriend, setNewFriend] = useState('')
  const [toast, setToast] = useState({ show: false, message: '' })
  const resultadosRef = useRef(null)
  const [showExportBtn, setShowExportBtn] = useState(true)
  const [showExport, setShowExport] = useState(false)
  const exportRef = useRef(null)

  // Guardar en localStorage cuando cambian friends o expenses
  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends))
  }, [friends])
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const showToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 2500)
  }

  const addFriend = () => {
    if (newFriend && !friends.includes(newFriend)) {
      setFriends([...friends, newFriend])
      setNewFriend('')
    }
  }

  const removeFriend = (friendToRemove) => {
    setFriends(friends.filter(friend => friend !== friendToRemove))
  }

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.paidBy) {
      showToast('Por favor completa todos los campos para agregar un gasto.')
      return
    }
    setExpenses([...expenses, {
      ...newExpense,
      amount: Number(newExpense.amount),
      participants: friends,
      id: Date.now()
    }])
    setNewExpense({
      description: '',
      amount: '',
      paidBy: '',
      participants: []
    })
  }

  const removeExpense = (expenseId) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId))
  }

  const calculateSplits = () => {
    const balances = {}
    friends.forEach(friend => balances[friend] = 0)

    expenses.forEach(expense => {
      // Dividir entre todos los amigos actuales
      const amountPerPerson = expense.amount / friends.length
      balances[expense.paidBy] += expense.amount
      friends.forEach(participant => {
        balances[participant] -= amountPerPerson
      })
    })

    return balances
  }

  const getSettlements = () => {
    const balances = calculateSplits()
    const settlements = []
    const debtors = Object.entries(balances)
      .filter(([_, balance]) => balance < 0)
      .sort((a, b) => a[1] - b[1])
    const creditors = Object.entries(balances)
      .filter(([_, balance]) => balance > 0)
      .sort((a, b) => b[1] - a[1])

    debtors.forEach(([debtor, debt]) => {
      let remainingDebt = Math.abs(debt)
      creditors.forEach(([creditor, credit]) => {
        if (remainingDebt > 0 && credit > 0) {
          const amount = Math.min(remainingDebt, credit)
          settlements.push({
            from: debtor,
            to: creditor,
            amount: amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })
          })
          remainingDebt -= amount
        }
      })
    })

    return settlements
  }

  // --- HANDLER PARA EL INPUT DE MONTO ---
  const handleAmountChange = (e) => {
    // Solo permitimos números
    const raw = e.target.value.replace(/[^\d]/g, '')
    setNewExpense({
      ...newExpense,
      amount: raw
    })
  }

  const exportarResultadosComoImagen = async () => {
    setShowExport(true)
    await new Promise(res => setTimeout(res, 100))
    if (!exportRef.current) return
    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: '#fff',
      scale: 2
    })
    setShowExport(false)
    const link = document.createElement('a')
    link.download = 'resultados-gastos.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="container">
      {toast.show && (
        <div className="toast-error">{toast.message}</div>
      )}
      <h1 style={{textAlign: 'center', fontWeight: 800, fontSize: '2.1rem', color: '#334155', marginBottom: '2.2rem'}}>Cuentas claras</h1>
      <div className="section">
        <h2>Agregar Amigos</h2>
        <div className="input-group">
          <input
            type="text"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
            placeholder="Nombre del amigo"
            onKeyPress={(e) => e.key === 'Enter' && addFriend()}
          />
          <button onClick={addFriend}>Agregar</button>
        </div>
        <div className="friends-list">
          {friends.map(friend => (
            <div key={friend} className="friend-tag">
              {friend}
              <button 
                onClick={() => removeFriend(friend)}
                style={{ 
                  background: 'none', 
                  padding: '0', 
                  color: 'var(--text-secondary)',
                  fontSize: '1.2rem'
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Agregar Gasto</h2>
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
          <button onClick={addExpense}>Agregar Gasto</button>
        </div>
      </div>

      {/* Gastos Registrados solo si hay gastos */}
      {expenses.length > 0 && (
        <div className="section">
          <h2>Gastos Registrados</h2>
          <div className="expenses-list">
            {expenses.map((expense) => (
              <div key={expense.id} className="expense-item">
                <div className="expense-info">
                  <div className="expense-desc">{expense.description}</div>
                  <div className="expense-meta">
                    <span className="expense-amount">{formatCurrency(expense.amount)}</span>
                    <span>Pagado por: <b>{expense.paidBy}</b></span>
                  </div>
                </div>
                <button 
                  className="expense-delete-btn"
                  onClick={() => removeExpense(expense.id)}
                  title="Eliminar gasto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resultados solo si hay settlements */}
      {getSettlements().length > 0 && (
        <div className="section" ref={resultadosRef}>
          <h2>Resultados</h2>
          <div className="settlements">
            {getSettlements().map((settlement, index) => (
              <div key={index} className="settlement-item">
                <p>
                  <span style={{ fontWeight: '600' }}>{settlement.from}</span> debe pagar 
                  <span style={{ color: 'var(--success-color)', fontWeight: '600' }}> {settlement.amount}</span> a 
                  <span style={{ fontWeight: '600' }}> {settlement.to}</span>
                </p>
              </div>
            ))}
          </div>
          <button 
            style={{marginTop: '1.2rem', width: '100%', background: 'var(--primary-color)', color: 'white', borderRadius: '0.7rem', fontWeight: 600, fontSize: '1rem', padding: '0.7rem 0'}} 
            onClick={exportarResultadosComoImagen}
          >
            Exportar como PNG
          </button>
          <button
            style={{marginTop: '0.7rem', width: '100%', background: '#f87171', color: 'white', borderRadius: '0.7rem', fontWeight: 600, fontSize: '1rem', padding: '0.7rem 0', border: 'none'}}
            onClick={() => {
              if(window.confirm('¿Estás seguro de que quieres reiniciar todo? Se borrarán todos los datos.')) {
                localStorage.removeItem('friends');
                localStorage.removeItem('expenses');
                setFriends([]);
                setExpenses([]);
                setNewExpense({ description: '', amount: '', paidBy: '', participants: [] });
                setNewFriend('');
              }
            }}
          >
            Reiniciar todo
          </button>
        </div>
      )}
      {/* Renderizado oculto para exportar */}
      {showExport && (
        <div style={{position: 'fixed', left: -9999, top: 0, zIndex: -1}}>
          <div ref={exportRef}>
            <ResultadosExport settlements={getSettlements()} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
