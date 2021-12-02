import React from 'react'

import DatamapsIndia from 'react-datamaps-india'

const IndiaMap = () => (
  <DatamapsIndia
    regionData={{
      Maharashtra: {
        value: 10,
      },
    }}
    mapLayout={{
      title: 'Title',
      legendTitle: 'Legend Title',
      startColor: '#FFDAB9',
      endColor: '#FF6347',
      hoverTitle: 'Count',
      noDataColor: '#f5f5f5',
      borderColor: '#8D8D8D',
      hoverBorderColor: '#8D8D8D',
      hoverColor: 'green',
    }}
  />
)

export default IndiaMap
