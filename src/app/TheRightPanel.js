import React from 'react'
import { useLocation } from 'react-router-dom'
import { ShoppingCart } from '../features/cart/ShoppingCartPage'

export const TheRightPanel = () => {
  const location = useLocation()

  return (
    // hide right side panel when visiting route '/cart'
    location.pathname !== '/cart'
      ? <div className="border-left border-light right-side-panel p-0"><ShoppingCart /></div>
      : null
  )
}
