import React from 'react'
import { useSelector } from 'react-redux'
import { CartList } from './CartList'
import { getAllItems, getTotalPrice, getTotalQuantity } from './cartSlice'
import { thaiCurrencyFormat } from '../../app/js/helpers'
import { Button } from 'react-bootstrap'

export const ShoppingCart = () => {
  const totalPrice = useSelector(getTotalPrice)
  const totalQuantity = useSelector(getTotalQuantity)
  const allItems = useSelector(getAllItems)

  const emprtyCart = (
    <div className="my-5 text-center text-muted">
      Products you add to your cart will appear here
    </div>
  )

  return (
    <div className="mt-md-5 mt-sm-3">
      <div className="pl-1 max-width-500 pt-1 container">
        <div className="text-muted">Total Qty: <span className="font-weight-bolder text-body">{totalQuantity === null ? 0 : totalQuantity}</span></div>
        <div className="text-muted">Total Price: <span className="font-weight-bolder text-body">{totalPrice === null ? 0 : thaiCurrencyFormat(Math.abs(totalPrice))}</span></div>
        <div className="pl-0 pt-2">
          { allItems.length ? <CartList /> : emprtyCart }
        </div>
        <Button
          className="btn-seagreen"
          variant="outline-light"
          size="sm"
          block
          disabled={totalQuantity === 0 || totalPrice === 0}
        >
        Checkout
        </Button>
      </div>
    </div>
  )
}
