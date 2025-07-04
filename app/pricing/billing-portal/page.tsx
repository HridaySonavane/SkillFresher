import { BillingPortal } from '@/components/subscription/billing-portal'
import React from 'react'

const page = () => {
  return (
    <BillingPortal subscription={
        {
            status: 'active',
            current_period_end: '2024-12-31',
            plan_name: 'Pro Plan',
            amount: 1999, // Amount in cents
        }
    } />
  )
}

export default page