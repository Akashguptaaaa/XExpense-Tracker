import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import WalletBalance from './components/WalletBalance'
import ExpenseSummary from './components/ExpenseSummary'
import AddIncomeForm from './components/AddIncomeForm'
import AddEditExpenseForm from './components/AddEditExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpensePieChart from './components/ExpensePieChart'
import ExpenseTrends from './components/ExpenseTrends'
import './App.css'

Modal.setAppElement('#root')

const DEFAULT_WALLET_BALANCE = 4500
const DEFAULT_EXPENSES = [
  {
    id: 1,
    title: 'Auto',
    price: 50,
    category: 'Travel',
    date: '2024-03-22',
  },
  {
    id: 2,
    title: 'Movie',
    price: 300,
    category: 'Entertainment',
    date: '2024-03-21',
  },
  {
    id: 3,
    title: 'Samosa',
    price: 150,
    category: 'Food',
    date: '2024-03-20',
  },
]

const getInitialWalletBalance = () => {
  try {
    const savedBalance = localStorage.getItem('walletBalance')
    return savedBalance !== null ? Number(savedBalance) : DEFAULT_WALLET_BALANCE
  } catch (error) {
    console.error('Unable to restore wallet balance from localStorage.', error)
    return DEFAULT_WALLET_BALANCE
  }
}

const getInitialExpenses = () => {
  try {
    const savedExpenses = localStorage.getItem('expenses')

    if (!savedExpenses) {
      return DEFAULT_EXPENSES
    }

    const parsedExpenses = JSON.parse(savedExpenses)
    return Array.isArray(parsedExpenses) ? parsedExpenses : DEFAULT_EXPENSES
  } catch (error) {
    console.error('Unable to restore expenses from localStorage.', error)
    return DEFAULT_EXPENSES
  }
}

function App() {
  const [walletBalance, setWalletBalance] = useState(getInitialWalletBalance)
  const [expenses, setExpenses] = useState(getInitialExpenses)
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)

  useEffect(() => {
    localStorage.setItem('walletBalance', walletBalance)
  }, [walletBalance])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const handleAddIncome = (amount) => {
    setWalletBalance((currentBalance) => currentBalance + amount)
    setIsIncomeModalOpen(false)
  }

  const handleAddExpense = (formData) => {
    const expenseAmount = Number(formData.price)

    if (editingExpense !== null) {
      const existingExpense = expenses.find((exp) => exp.id === editingExpense.id)

      if (!existingExpense) {
        return
      }

      const amountDifference = expenseAmount - existingExpense.price

      if (walletBalance - amountDifference < 0) {
        alert('Insufficient wallet balance for this expense')
        return
      }

      setExpenses((currentExpenses) =>
        currentExpenses.map((exp) =>
          exp.id === editingExpense.id ? { ...exp, ...formData, price: expenseAmount } : exp
        )
      )
      setWalletBalance((currentBalance) => currentBalance - amountDifference)
      setEditingExpense(null)
    } else {
      if (walletBalance - expenseAmount < 0) {
        alert('Insufficient wallet balance for this expense')
        return
      }

      const newExpense = {
        id: Date.now(),
        ...formData,
        price: expenseAmount,
      }
      setExpenses((currentExpenses) => [...currentExpenses, newExpense])
      setWalletBalance((currentBalance) => currentBalance - expenseAmount)
    }

    setIsExpenseModalOpen(false)
  }

  const handleEditExpense = (expense) => {
    setEditingExpense(expense)
    setIsExpenseModalOpen(true)
  }

  const handleDeleteExpense = (expenseId) => {
    const expense = expenses.find((exp) => exp.id === expenseId)

    if (!expense) {
      return
    }

    setExpenses((currentExpenses) => currentExpenses.filter((exp) => exp.id !== expenseId))
    setWalletBalance((currentBalance) => currentBalance + expense.price)
  }

  const handleCloseExpenseModal = () => {
    setIsExpenseModalOpen(false)
    setEditingExpense(null)
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.price, 0)

  return (
    <div className="app-container">
      <div className="dashboard-shell">
        <h1 className="app-title">Expense Tracker</h1>

        <div className="summary-section">
          <WalletBalance balance={walletBalance} onAddIncome={() => setIsIncomeModalOpen(true)} />

          <ExpenseSummary
            totalExpenses={totalExpenses}
            onAddExpense={() => setIsExpenseModalOpen(true)}
          />

          <ExpensePieChart expenses={expenses} />
        </div>

        <div className="content-section">
          <ExpenseList expenses={expenses} onEdit={handleEditExpense} onDelete={handleDeleteExpense} />

          <ExpenseTrends expenses={expenses} />
        </div>
      </div>

      <AddIncomeForm
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        onSubmit={handleAddIncome}
      />

      <AddEditExpenseForm
        isOpen={isExpenseModalOpen}
        onClose={handleCloseExpenseModal}
        onSubmit={handleAddExpense}
        initialData={editingExpense}
        isEditing={editingExpense !== null}
      />
    </div>
  )
}

export default App
