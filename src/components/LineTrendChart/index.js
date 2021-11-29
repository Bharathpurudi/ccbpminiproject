import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const LineTrendChart = props => {
  const {lineChartDetails, chartType, trendColor, chartName} = props
  const chartBackgroundClass = () => {
    switch (chartType) {
      case 'confirmed':
        return 'confirmed-bg-container'
      case 'active':
        return 'active-bg-container'
      case 'recovered':
        return 'recovered-bg-container'
      case 'deceased':
        return 'deceased-bg-container'
      case 'tested':
        return 'tested-bg-container'
      case 'vaccinated1':
        return 'vaccinated1-bg-container'
      case 'testPositivityRatio':
        return 'test-positivity-ratio-bg-container'
      default:
        return null
    }
  }

  return (
    <div className={chartBackgroundClass()}>
      <ResponsiveContainer width="100%" aspect={5}>
        <LineChart
          data={lineChartDetails}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" stroke={trendColor} />
          <YAxis
            stroke={trendColor}
            dataKey={chartType}
            type="number"
            tickFormatter={value =>
              new Intl.NumberFormat('en', {
                notation: 'compact',
                compactDisplay: 'short',
              }).format(value)
            }
          />
          <Tooltip />
          <Legend
            layout="horizantal"
            verticalAlign="top"
            align="right"
            wrapperStyle={{top: 25, right: 25}}
          />
          <Line
            name={chartName}
            type="monotone"
            dataKey={chartType}
            stroke={trendColor}
            activeDot={{trendColor}}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineTrendChart
