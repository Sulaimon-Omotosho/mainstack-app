import RevenueChart from '@/components/RevenueChart'
import Transactions from '@/components/Transactions'
import React from 'react'

const RevenuePage = () => {
  return (
    <section className='w-full pt-14'>
      <RevenueChart />
      <Transactions />
    </section>
  )
}

export default RevenuePage
