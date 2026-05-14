import PropTypes from 'prop-types'
import { formatCurrency } from '../formatters'
import '../styles/WalletBalance.css'

function WalletBalance({ balance, onAddIncome }) {
  return (
    <div className="balance-card">
      <div className="balance-info">
        <h3>
          Wallet Balance:
          <span className="balance-amount">{formatCurrency(balance)}</span>
        </h3>
        <button
          type="button"
          className="btn btn-add-income"
          onClick={onAddIncome}
        >
          + Add Income
        </button>
      </div>
    </div>
  )
}

WalletBalance.propTypes = {
  balance: PropTypes.number.isRequired,
  onAddIncome: PropTypes.func.isRequired,
}

export default WalletBalance
