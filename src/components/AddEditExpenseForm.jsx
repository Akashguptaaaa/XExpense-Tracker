import PropTypes from 'prop-types'
import Modal from 'react-modal'
import '../styles/Modal.css'

function AddEditExpenseForm({ isOpen, onClose, onSubmit, initialData, isEditing }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const title = e.target.title.value.trim()
    const price = e.target.price.value
    const category = e.target.category.value
    const date = e.target.date.value

    if (!title || !price || !category || !date) {
      alert('Please fill in all required fields')
      return
    }

    if (Number(price) <= 0) {
      alert('Please enter a valid price')
      return
    }

    onSubmit({
      title,
      price,
      category,
      date,
    })
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
        <h2>{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>
        <form key={initialData?.id ?? 'new'} onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={initialData?.title || ''}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            defaultValue={initialData?.price ?? ''}
            step="0.01"
            min="0.01"
            required
          />
          <select
            name="category"
            defaultValue={initialData?.category || ''}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Utilities">Utilities</option>
            <option value="Health">Health</option>
          </select>
          <input
            type="date"
            name="date"
            defaultValue={initialData?.date || ''}
            required
          />
          <div className="modal-actions">
            <button type="submit" className="btn btn-submit">
              {isEditing ? 'Update Expense' : 'Add Expense'}
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

AddEditExpenseForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    category: PropTypes.string,
    date: PropTypes.string,
  }),
  isEditing: PropTypes.bool,
}

AddEditExpenseForm.defaultProps = {
  initialData: null,
  isEditing: false,
}

export default AddEditExpenseForm
