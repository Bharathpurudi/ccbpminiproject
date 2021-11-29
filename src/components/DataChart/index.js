import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const DataChart = props => {
  const {chartsData, insight, colorDetail} = props
  const latestData = chartsData.slice(-10)

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <BarChart
        width={500}
        height={300}
        data={latestData}
        margin={{
          top: 5,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" stroke={colorDetail} />
        <YAxis
          type="number"
          stroke={colorDetail}
          tickFormatter={value =>
            new Intl.NumberFormat('en', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(value)
          }
        />
        <Tooltip />
        <Bar dataKey={insight} fill={colorDetail} radius={5} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default DataChart
