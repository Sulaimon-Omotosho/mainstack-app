'use client'
import React from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'

const LineChartComp = ({ data }: any) => {
  return (
    <div className='mt-4 relative'>
      <ResponsiveContainer width='100%' height={250}>
        <LineChart data={data}>
          <XAxis dataKey='date' tick={{ fontSize: 12 }} tickLine={false} />
          <Line
            type='monotone'
            dataKey='balance'
            stroke='#E27128'
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartComp
