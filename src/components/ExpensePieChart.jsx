import PropTypes from 'prop-types'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatCurrency } from '../formatters'
import '../styles/Chart.css'

const CATEGORY_COLORS = {
  Food: '#b517f5',
  Entertainment: '#ff9f1c',
  Travel: '#ffe11a',
  Shopping: '#34d399',
  Utilities: '#60a5fa',
  Health: '#fb7185',
}

function ExpensePieChart({ expenses }) {
  const expenseSummary = expenses.reduce((acc, exp) => {
    const existing = acc.find((item) => item.name === exp.category)
    if (existing) {
      existing.value += exp.price
    } else {
      acc.push({ name: exp.category, value: exp.price })
    }
    return acc
  }, []).sort((left, right) => right.value - left.value)

  return (
    <div className="chart-card pie-chart">
      {expenseSummary.length === 0 ? (
        <div className="chart-empty">Add an expense to see the category split.</div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={expenseSummary}
              cx="50%"
              cy="46%"
              labelLine={false}
              label={({ percent }) => (percent >= 0.08 ? `${Math.round(percent * 100)}%` : '')}
              outerRadius={86}
              stroke="transparent"
              dataKey="value"
            >
              {expenseSummary.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] ?? '#8b5cf6'}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend verticalAlign="bottom" align="center" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

ExpensePieChart.propTypes = {
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

export default ExpensePieChart
