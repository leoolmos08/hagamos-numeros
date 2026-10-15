import React, { useState } from 'react'
import './App.css'
import ExpenseCard from './components/ExpenseCard/ExpenseCard'
import FriendsList from './components/FriendsList/FriendsList'
import AddFriend from './components/AddFriend/AddFriend'
import ExpenseForm from './components/ExpenseForm/ExpenseForm'
import SettlementsList from './components/SettlementsList/SettlementsList'
import Toast from './components/Toast/Toast'
import Header from './components/Header/Header'
import ExpensesSummary from './components/ExpensesSummary/ExpensesSummary'
import ExportButton from './components/ExportButton/ExportButton'
import ResetButton from './components/ResetButton/ResetButton'
import { formatCurrency, formatSettlementsMessage } from './utils/calculations'
import FriendsManager from './components/FriendsManager/FriendsManager'
import ExpensesManager from './components/ExpensesManager/ExpensesManager'
import Footer from './components/Footer/Footer'

function App() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' })
  const resultadosRef = React.useRef(null)

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 2500)
  }

  const {
    friends,
    addFriend,
    removeFriend,
    newFriend,
    setNewFriend
  } = FriendsManager()

  const {
    expenses,
    newExpense,
    setNewExpense,
    showExcludeList,
    setShowExcludeList,
    addExpense,
    removeExpense,
    handleAmountChange,
    settlements
  } = ExpensesManager({ friends })

  const copiarResultados = async () => {
    try {
      await navigator.clipboard.writeText(formatSettlementsMessage(settlements))
      showToast('Copiado', 'success')
    } catch {
      showToast('No se pudo copiar. Tu navegador no permite acceder al portapapeles.')
    }
  }

  const handleReset = () => {
    if(window.confirm('¿Estás seguro de que quieres reiniciar todo? Se borrarán todos los datos.')) {
      localStorage.removeItem('friends')
      localStorage.removeItem('expenses')
      window.location.reload()
    }
  }

  const handleAddExpense = () => {
    if (!addExpense()) {
      showToast('Por favor completa todos los campos para agregar un gasto.')
    }
  }

  return (
    <div className="container">
      <Toast show={toast.show} message={toast.message} type={toast.type} />
      <Header />

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
          addExpense={handleAddExpense}
          formatCurrency={formatCurrency}
          handleAmountChange={handleAmountChange}
          showExcludeList={showExcludeList}
          setShowExcludeList={setShowExcludeList}
        />
      </div>

      {expenses.length > 0 && (
        <div className="section">
          <h2>Gastos Registrados</h2>
          <ExpensesSummary expenses={expenses} friends={friends} />
          <div className="expenses-list">
            {expenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                removeExpense={removeExpense}
                formatCurrency={formatCurrency}
              />
            ))}
          </div>
        </div>
      )}

      {settlements.length > 0 && (
        <div className="section" ref={resultadosRef}>
          <h2>Resultados</h2>
          <SettlementsList settlements={settlements} />
          <div className="results-actions">
            <ExportButton onClick={copiarResultados} />
            <ResetButton onReset={handleReset} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default App
