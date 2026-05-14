export function formatCurrency(amount) {
  const numericAmount = Number(amount) || 0
  const normalizedAmount = Number.isInteger(numericAmount)
    ? String(numericAmount)
    : numericAmount.toFixed(2)

  return `₹${normalizedAmount}`
}

export function formatDate(dateValue) {
  const parsedDate = new Date(dateValue)

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate)
}
