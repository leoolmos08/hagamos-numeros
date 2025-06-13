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
import { formatCurrency } from './utils/calculations'
import FriendsManager from './components/FriendsManager/FriendsManager'
import ExpensesManager from './components/ExpensesManager/ExpensesManager'
import ExportManager from './components/ExportManager/ExportManager'

function App() {
  const [toast, setToast] = useState({ show: false, message: '' })
  const resultadosRef = React.useRef(null)

  const showToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 2500)
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

  const {
    exportarResultadosComoImagen,
    ExportPreview
  } = ExportManager({ settlements })

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
      <Toast show={toast.show} message={toast.message} />
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
                friends={friends}
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
          <ExportButton onClick={exportarResultadosComoImagen} />
          <ResetButton onReset={handleReset} />
        </div>
      )}

      <ExportPreview />
    </div>
  )
}

export default App
