'use client'
import React from 'react'
import { Button } from './ui/button'
import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'
import { balances } from '@/constants'
import Image from 'next/image'

const RevenueChart = () => {
  const data = [
    { date: 'Apr 1, 2022', balance: 100 },
    { date: 'Apr 10, 2022', balance: 150 },
    { date: 'Apr 20, 2022', balance: 80 },
    { date: 'Apr 30, 2022', balance: 120 },
  ]

  return (
    <div className='flex gap-[120px] mb-20'>
      <div className='flex-2'>
        {/* Available Balance */}
        <div className='flex justify-between items-center w-[60%]'>
          <div className='flex flex-col gap-5'>
            <div className='text-gray-500 text-sm'>Available Balance</div>
            <div className='text-3xl font-bold'>
              USD <span className='text-black'>120,500.00</span>
            </div>
          </div>

          <Button className='bg-black text-white px-12 py-6 rounded-full hover:bg-gray-800'>
            Withdraw
          </Button>
        </div>

        {/* Line Chart */}
        <div className='mt-4'>
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
      </div>
      <div className='flex-1 flex flex-col justify-between h-[300px]'>
        {balances.map((item, idx) => (
          <div className='relative' key={idx}>
            <p className='text-sm'>{item.name}</p>
            <h2 className='font-bold text-2xl pt-2'>USD {item.amount}</h2>
            <Image
              src='/icons/info.svg'
              alt='icon'
              height={20}
              width={20}
              className='absolute right-0 top-0'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RevenueChart
