import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts'
import './index.css'

const DataChart = props => {
  const {chartsData, insight, colorDetail} = props
  const latestData = chartsData.slice(-10)

  return (
    <div className="data-chart-bg-container">
      <BarChart
        width={1000}
        height={300}
        data={latestData}
        margin={{
          top: 20,
          right: 10,
          left: 0,
        }}
      >
        <XAxis
          dataKey="name"
          stroke={colorDetail}
          tick={{fontFamily: 'sans-serif', fontSize: '12', fontWeight: '600'}}
        />
        <YAxis
          type="number"
          stroke={colorDetail}
          tick={{fontFamily: 'sans-serif', fontSize: '12', fontWeight: '600'}}
          tickFormatter={value =>
            new Intl.NumberFormat('en', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(value)
          }
        />
        <Legend
          layout="horizontal"
          verticalAlign="top"
          align="right"
          wrapperStyle={{top: 2, right: 25}}
        />
        <Tooltip />
        <Bar dataKey={insight} fill={colorDetail} radius={5} />
      </BarChart>
    </div>
  )
}

export default DataChart
