import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts'
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
      <LineChart
        width={1}
        height={300}
        data={lineChartDetails}
        margin={{
          top: 25,
          right: 10,
          left: 0,
        }}
      >
        <XAxis
          dataKey="name"
          stroke={trendColor}
          tick={{fontFamily: 'sans-serif', fontSize: '12', fontWeight: '600'}}
        />
        <YAxis
          stroke={trendColor}
          dataKey={chartType}
          type="number"
          tick={{fontFamily: 'sans-serif', fontSize: '12', fontWeight: '600'}}
          tickFormatter={value =>
            new Intl.NumberFormat('en', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(value)
          }
        />
        <Tooltip />
        <Legend
          layout="horizontal"
          verticalAlign="top"
          align="right"
          wrapperStyle={{top: 2, right: 25}}
        />
        <Line
          name={chartName}
          type="monotone"
          dataKey={chartType}
          stroke={trendColor}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </div>
  )
}

export default LineTrendChart
