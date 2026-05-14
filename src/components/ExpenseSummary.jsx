import PropTypes from 'prop-types'
import { formatCurrency } from '../formatters'
import '../styles/ExpenseSummary.css'

function ExpenseSummary({ totalExpenses, onAddExpense }) {
  return (
    <div className="expenses-card">
      <div className="expenses-info">
        <h3>
          Expenses:
          <span className="expenses-amount">{formatCurrency(totalExpenses)}</span>
        </h3>
        <button
          type="button"
          className="btn btn-add-expense"
          onClick={onAddExpense}
        >
          + Add Expense
        </button>
      </div>
    </div>
  )
}

ExpenseSummary.propTypes = {
  totalExpenses: PropTypes.number.isRequired,
  onAddExpense: PropTypes.func.isRequired,
}

export default ExpenseSummary
