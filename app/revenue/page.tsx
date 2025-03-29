import RevenueChart from '@/components/RevenueChart'
import Transactions from '@/components/Transactions'
import React from 'react'

const RevenuePage = () => {
  return (
    <section className='w-screen lg:w-full pt-5 md:pt-14'>
      <RevenueChart />
      <Transactions />
    </section>
  )
}

export default RevenuePage
