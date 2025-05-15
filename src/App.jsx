import { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import logoExport from './assets/logo-export.png'
import mainLogo from './assets/mainLogo.png'
import './App.css'
import ExpenseCard from './components/ExpenseCard'
import FriendsList from './components/FriendsList'
import AddFriend from './components/AddFriend'
import ExpenseForm from './components/ExpenseForm'
import ResultadosExport from './components/ResultadosExport'
import SettlementsList from './components/SettlementsList'

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
  const [showExcludeList, setShowExcludeList] = useState(false)
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    paidBy: '',
    participants: [],
    excluded: []
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
  }

  const removeExpense = (expenseId) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId))
  }

  const calculateSplits = () => {
    // Inicializar balances
    const balances = {}
    friends.forEach(friend => {
      balances[friend] = 0
    })
    // Para cada persona, calcular lo que debería pagar y lo que pagó
    friends.forEach(friend => {
      let debePagar = 0
      let pago = 0
      expenses.forEach(expense => {
        const participants = friends.filter(f => !(expense.excluded || []).includes(f))
        if (participants.includes(friend)) {
          // Si participa, suma su parte
          debePagar += expense.amount / participants.length
        }
        if (expense.paidBy === friend && participants.includes(friend)) {
          // Si pagó y participa, suma el total pagado
          pago += expense.amount
        }
      })
      balances[friend] = Math.round(pago - debePagar)
    })
    return balances
  }

  const getSettlements = () => {
    const balances = calculateSplits()
    const settlements = []
    
    // Convertir balances a arrays mutables
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
      if (amount < 1) break // Evitar pagos insignificantes
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: formatCurrency(amount)
      })
      // Actualizar balances
      debtor.balance += amount
      creditor.balance -= amount
      // Eliminar si ya está saldado
      if (Math.abs(debtor.balance) < 1) debtors.shift()
      if (creditor.balance < 1) creditors.shift()
      // Reordenar
      debtors.sort((a, b) => a.balance - b.balance)
      creditors.sort((a, b) => b.balance - a.balance)
    }
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
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem'}}>
        <img src={mainLogo} alt="Logo Hagamos Números" style={{width: '90%', maxWidth: 400, display: 'block', margin: '2.5rem auto 0 auto', height: 'auto'}} />
      </div>
      <div className="section">
        <h2>Agregar Amigos</h2>
        <AddFriend newFriend={newFriend} setNewFriend={setNewFriend} addFriend={addFriend} />
        <FriendsList friends={friends} removeFriend={removeFriend} />
      </div>

      <div className="section">
        <h2>Agregar Gasto</h2>
        <ExpenseForm
          newExpense={newExpense}
          setNewExpense={setNewExpense}
          friends={friends}
          addExpense={addExpense}
          formatCurrency={formatCurrency}
          handleAmountChange={handleAmountChange}
          showExcludeList={showExcludeList}
          setShowExcludeList={setShowExcludeList}
        />
      </div>

      {/* Gastos Registrados solo si hay gastos */}
      {expenses.length > 0 && (
        <div className="section">
          <h2>Gastos Registrados</h2>
          {friends.length > 0 && (
            <div style={{color: '#64748b', fontWeight: 300, fontSize: '0.9rem', marginTop: '-1.2rem', marginBottom: '1rem'}}>
              Cada uno paga: {formatCurrency(expenses.reduce((sum, e) => sum + e.amount, 0) / friends.length)}
            </div>
          )}
          <div className="expenses-list">
            {expenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                friends={friends}
                removeExpense={removeExpense}
                formatCurrency={formatCurrency}
              />
            ))}
          </div>
        </div>
      )}

      {/* Resultados solo si hay settlements */}
      {getSettlements().length > 0 && (
        <div className="section" ref={resultadosRef}>
          <h2>Resultados</h2>
          <SettlementsList settlements={getSettlements()} />
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
                setNewExpense({ description: '', amount: '', paidBy: '', participants: [], excluded: [] });
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
