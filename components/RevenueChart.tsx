'use client'

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import LineChartComp from './LineChartComp'
import { WALLET } from '@/lib/types'

const RevenueChart = () => {
  const [walletData, setWalletData] = useState<WALLET | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await fetch('https://fe-task-api.mainstack.io/wallet')
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = (await response.json()) as WALLET
        setWalletData(data)
      } catch (error) {
        setError('Failed to fetch wallet data')
      }
    }

    fetchWalletData()
  }, [])

  const formatNumber = (num: number | any) =>
    num ? new Intl.NumberFormat('en-US').format(num) : '0.00'

  if (error) return <p className='text-red-500'>{error}</p>

  const data = [
    { date: 'Apr 1, 2022', balance: 100 },
    { date: 'Apr 10, 2022', balance: 150 },
    { date: 'Apr 20, 2022', balance: 80 },
    { date: 'Apr 30, 2022', balance: 120 },
  ]

  return (
    <div className='flex flex-col md:flex-row w-full px-4 gap-5 lg:gap-[120px] mb-20 z-0'>
      <div className='flex flex-col md:flex-2 w-full'>
        {/* Available Balance */}
        <div className='flex flex-col md:flex-row gap-5 md:justify-between items-end w-full lg:w-[60%]'>
          <div className='flex flex-col gap-2 items-end md:items-start md:gap-5'>
            <div className='text-gray-500 text-sm'>Available Balance</div>
            <div className='text-3xl font-bold'>
              USD{' '}
              <span className='text-black'>
                {walletData?.balance.toFixed(2)}
              </span>
            </div>
          </div>

          <Button className='bg-black text-white px-6 py-3 md:px-12 md:py-6 rounded-full hover:bg-gray-800'>
            Withdraw
          </Button>
        </div>

        {/* Line Chart */}
        <LineChartComp data={data} />
      </div>
      <div className='md:flex-1 flex flex-col justify-between h-[300px] z-0'>
        {[
          { label: 'Ledger Balance', value: walletData?.ledger_balance },
          { label: 'Total Payout', value: walletData?.total_payout },
          { label: 'Total Revenue', value: walletData?.total_revenue },
          { label: 'Pending Payout', value: walletData?.pending_payout },
        ].map((item, index) => (
          <div className='relative' key={index}>
            <p className='text-sm'>{item.label}</p>
            <h2 className='font-bold text-2xl pt-2'>
              USD {formatNumber(item.value)}
            </h2>
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
