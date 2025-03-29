import React from 'react'
import { Button } from './ui/button'
import { ChevronDown, Download } from 'lucide-react'
import { transactions } from '@/constants'

const TransactionsPage = () => {
  return (
    <section className=' mb-96'>
      <section className='flex justify-between'>
        <div className=''>
          <h2 className='text-xl font-bold'>24 Transactions</h2>
          <p className='text-xs text-gray-500'>
            Your transactions for the last 7 days
          </p>
        </div>
        <div className='flex gap-2'>
          <Button className='text-sm text-black bg-gray-200 rounded-full flex gap-1 justify-center items-center hover:bg-gray-300'>
            Filter
            <ChevronDown />
          </Button>
          <Button className='text-sm text-black bg-gray-200 rounded-full flex gap-1 justify-center items-center hover:bg-gray-300'>
            Export list
            <Download />
          </Button>
        </div>
      </section>
      <hr className='bg-gray-300 w-full my-5' />
      <section className=''>
        {transactions.map((txn) => (
          <div
            key={txn.id}
            className='flex justify-between items-center py-3 border-b border-gray-200'
          >
            {/* LEFT  */}
            <div className='flex items-center space-x-3'>
              {/* <span className='text-xl'>{txn.icon}</span> */}

              {/* Transaction Info */}
              <div>
                <div className='font-medium'>{txn.title}</div>
                {txn.name && (
                  <div className='text-sm text-gray-500'>{txn.name}</div>
                )}
                {txn.status && (
                  <div className={`text-sm font-medium`}>{txn.status}</div>
                )}
              </div>
            </div>

            {/* Right: Amount & Date */}
            <div className='text-right'>
              <div className='font-semibold'>{txn.amount}</div>
              <div className='text-sm text-gray-500'>{txn.date}</div>
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}

export default TransactionsPage
