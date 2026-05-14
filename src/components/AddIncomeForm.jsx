import PropTypes from 'prop-types'
import Modal from 'react-modal'
import '../styles/Modal.css'

function AddIncomeForm({ isOpen, onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const incomeAmount = e.target.incomeAmount.value
    if (!incomeAmount || parseFloat(incomeAmount) <= 0) {
      alert('Please enter a valid income amount')
      return
    }
    onSubmit(parseFloat(incomeAmount))
    e.target.reset()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <h2>Add Balance</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="incomeAmount"
            placeholder="Income Amount"
            step="0.01"
            min="0"
            required
          />
          <div className="modal-actions">
            <button type="submit" className="btn btn-submit">
              Add Balance
            </button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

AddIncomeForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default AddIncomeForm
