import React from 'react'
import { useSelector } from 'react-redux'
import { CartItem } from './CartItem'
import { getAllItems } from './cartSlice'

export const CartList = () => {
  const allItems = useSelector(getAllItems)

  return (
    <ul className="pl-0">
      {allItems.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  )
}
