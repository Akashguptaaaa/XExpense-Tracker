import PropTypes from 'prop-types'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCurrency } from '../formatters'
import '../styles/ExpenseTrends.css'

const BAR_COLOR = '#9b5de5'

function ExpenseTrends({ expenses }) {
  const expenseSummary = expenses.reduce((acc, exp) => {
    const existing = acc.find((item) => item.name === exp.category)
    if (existing) {
      existing.value += exp.price
    } else {
      acc.push({ name: exp.category, value: exp.price })
    }
    return acc
  }, [])

  const topExpenses = [...expenseSummary].sort((a, b) => b.value - a.value).slice(0, 3)

  return (
    <div className="top-expenses-section">
      <h2>Top Expenses</h2>
      {topExpenses.length === 0 ? (
        <div className="no-data">Add an expense to see the top categories.</div>
      ) : (
        <div className="trends-chart-shell">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={topExpenses}
              layout="vertical"
              margin={{ top: 6, right: 12, left: 12, bottom: 6 }}
              barCategoryGap={28}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                width={96}
              />
              <Tooltip
                cursor={{ fill: 'rgba(155, 93, 229, 0.08)' }}
                formatter={(value) => formatCurrency(Number(value))}
              />
              <Bar
                dataKey="value"
                radius={[999, 999, 999, 999]}
                barSize={16}
                background={{ fill: '#eee7ff', radius: 999 }}
              >
                {topExpenses.map((expense) => (
                  <Cell key={expense.name} fill={BAR_COLOR} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

ExpenseTrends.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default ExpenseTrends
