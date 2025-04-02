export interface USER {
  first_name: String
  last_name: String
  email: String
}

export interface WALLET {
  balance: Number
  total_payout: Number
  total_revenue: Number
  pending_payout: Number
  ledger_balance: Number
}

export interface TRANSACTION {
  amount: number
  metadata: {
    name: string
    type: string
    email: string
    quantity: number
    country: string
    product_name: string
  }
  payment_reference: string
  status: string
  type: 'deposit' | 'withdrawal'
  date: Date
}

export type FilterProps = {
  onFilter: (
    fromDate?: Date,
    toDate?: Date,
    selectedTypes?: string[],
    selectedStatuses?: string[]
  ) => void
  clearFilters: () => void
}
