import React from 'react'
import { Button } from './ui/button'
import { ChevronDown, Download } from 'lucide-react'

const Transactions = () => {
  return (
    <section>
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
    </section>
  )
}

export default Transactions
