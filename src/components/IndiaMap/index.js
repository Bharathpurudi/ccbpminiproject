import React from 'react'

import DatamapsIndia from 'react-datamaps-india'

const IndiaMap = () => (
  <DatamapsIndia
    height={200}
    mapLayout={{
      noDataColor: '#f5f5f5',
      borderColor: '#8D8D8D',
      hoverBorderColor: '#8D8D8D',
      hoverColor: 'green',
    }}
  />
)

export default IndiaMap
