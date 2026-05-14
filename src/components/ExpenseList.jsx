import PropTypes from 'prop-types'
import { formatCurrency } from '../formatters'
import '../styles/ExpenseList.css'

const CATEGORY_ICONS = {
  Food: '🍜',
  Entertainment: '🎬',
  Travel: '🚕',
  Shopping: '🛍️',
  Utilities: '💡',
  Health: '🩺',
}

function ExpenseList({ expenses, onEdit, onDelete }) {
  const recentTransactions = [...expenses].reverse().slice(0, 3)

  return (
    <div className="recent-section">
      <h2>Recent Transactions</h2>
      {recentTransactions.length === 0 ? (
        <p className="no-data">No transactions!</p>
      ) : (
        <div className="transactions-list">
          {recentTransactions.map((exp) => (
            <div key={exp.id} className="transaction-item">
              <div className="transaction-meta">
                <div className="transaction-icon" aria-hidden="true">
                  {CATEGORY_ICONS[exp.category] ?? '💸'}
                </div>
                <div className="transaction-info">
                  <span className="transaction-title">{exp.title}</span>
                  <span className="transaction-date">{exp.date}</span>
                </div>
              </div>
              <div className="transaction-actions">
                <span className="transaction-amount">{formatCurrency(exp.price)}</span>
                <button
                  type="button"
                  className="btn-icon btn-delete"
                  onClick={() => onDelete(exp.id)}
                  aria-label={`Delete ${exp.title}`}
                  title="Delete"
                >
                  x
                </button>
                <button
                  type="button"
                  className="btn-icon btn-edit"
                  onClick={() => onEdit(exp)}
                  aria-label={`Edit ${exp.title}`}
                  title="Edit"
                >
                  ✎
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ExpenseList
