'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button'
import { ArrowDownLeftIcon, ArrowUpRightIcon, Download } from 'lucide-react'
import Filter from './Filter'
import { TRANSACTION } from '@/lib/types'

const TransactionsPage = () => {
  const [transactionData, setTransactionData] = useState<TRANSACTION[] | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<{
    fromDate: Date | null
    toDate: Date | null
    selectedTypes: string[]
    selectedStatuses: string[]
  }>({
    fromDate: null,
    toDate: null,
    selectedTypes: [],
    selectedStatuses: [],
  })

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await fetch(
          'https://fe-task-api.mainstack.io/transactions'
        )
        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: Failed to fetch transactions`
          )
        }
        const data: TRANSACTION[] = await response.json()
        setTransactionData(data)
        // setFilteredTransactions(data)
      } catch (error) {
        setError('Failed to fetch Transaction Data')
      } finally {
        setLoading(false)
      }
    }

    fetchTransactionData()
  }, [])

  const filteredTransactions = useMemo(() => {
    return transactionData?.filter((transaction) => {
      const { fromDate, toDate, selectedTypes, selectedStatuses } = filters

      const transactionDate = new Date(transaction.date)

      if (fromDate instanceof Date && transactionDate < fromDate) return false
      if (toDate instanceof Date && transactionDate > toDate) return false
      if (selectedTypes.length > 0 && !selectedTypes.includes(transaction.type))
        return false
      if (
        selectedStatuses.length > 0 &&
        !selectedStatuses.includes(transaction.status)
      )
        return false

      return true
    })
  }, [transactionData, filters])

  const handleFilter = (
    fromDate?: Date,
    toDate?: Date,
    selectedTypes?: string[],
    selectedStatuses?: string[]
  ) => {
    setFilters({
      fromDate: fromDate ?? null, // Convert undefined to null
      toDate: toDate ?? null, // Convert undefined to null
      selectedTypes: selectedTypes || [],
      selectedStatuses: selectedStatuses || [],
    })
  }

  return (
    <section className='px-4 mb-96'>
      <section className='flex justify-between'>
        <div className=''>
          <h2 className='text-xl font-bold'>
            {transactionData
              ? `${transactionData.length} Transactions`
              : 'Transactions'}
          </h2>
          <p className='text-xs text-gray-500'>
            Your transactions for the last 7 days
          </p>
        </div>
        <div className='flex gap-2'>
          <Filter onFilter={handleFilter} />
          <Button className='text-sm text-black py-6 bg-gray-200 rounded-full flex gap-1 justify-center items-center hover:bg-gray-300'>
            Export list
            <Download />
          </Button>
        </div>
      </section>
      <hr className='bg-gray-300 w-full my-5' />

      {/* Loading State  */}
      {loading && (
        <p className='text-center text-gray-500 animate-pulse'>
          Loading Transactions...
        </p>
      )}

      {/* Error State  */}
      {error && <p className='text-center text-red-500'>{error}</p>}

      {/* Transactions List  */}
      {!loading &&
      !error &&
      filteredTransactions &&
      filteredTransactions.length > 0 ? (
        <section className=''>
          {filteredTransactions.map((txn, idx) => (
            <div
              key={idx}
              className='flex justify-between items-center py-3 border-b border-gray-200'
            >
              {/* LEFT: Transaction Info  */}
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-12 h-12 rounded-full flex justify-center items-center ${
                    txn.type === 'deposit' ? 'bg-[#E3FCF2]' : ' bg-[#F9E3E0]'
                  }`}
                >
                  {txn.type === 'deposit' ? (
                    <ArrowDownLeftIcon />
                  ) : (
                    <ArrowUpRightIcon />
                  )}
                </div>

                {/* Transaction Info */}
                <div>
                  <div className='font-medium'>
                    {txn.metadata?.product_name}
                  </div>
                  {txn.metadata?.name && (
                    <div className='text-sm text-gray-500'>
                      {txn.metadata?.name}
                    </div>
                  )}
                  {txn.status && (
                    <div className={`text-sm font-medium`}>{txn.status}</div>
                  )}
                </div>
              </div>

              {/* Right: Amount & Date */}
              <div className='text-right'>
                <div className='font-semibold'>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(txn.amount)}
                </div>
                <div className='text-sm text-gray-500'>
                  {new Date(txn.date).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        !loading &&
        !error && <p className='text-center'>No transactions found.</p>
      )}
    </section>
  )
}

export default TransactionsPage
