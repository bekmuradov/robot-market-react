/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllItems,
  incrementQtyByOne,
  decrementQtyByOne,
  removeFromCart,
  setCartItemsLength
} from './cartSlice'
import { thaiCurrencyFormat } from '../../app/js/helpers'

export const CartItem = ({ item }) => {
  const allItems = useSelector(getAllItems)

  const dispatch = useDispatch()

  function handleIncrement () {
    const itemId = item.id
    // validate quantity in the card
    // to prevent adding item to the cart more than its stock
    const itemQtyInCart = allItems.find(item => item.id === itemId)
    if (itemQtyInCart.quantity < item.stock) {
      dispatch(incrementQtyByOne(item.id))
    } else {
      return alert("You can't add more than product's stock")
    }
    // update boolean cart's length
    // to prevent adding more than 5 products to cart
    dispatch(setCartItemsLength())
  }

  function handleDecrement () {
    // if qty is 0 and trying to decrement
    // it will dispatch the action to remove the item
    if (item.quantity === 0) {
      dispatch(removeFromCart(item.id))
    } else {
    // otherwise substract by one
      dispatch(decrementQtyByOne(item.id))
    }
    // update boolean cart's length
    // to prevent adding more than 5 products to cart
    dispatch(setCartItemsLength())
  }

  function handleRemove () {
    dispatch(removeFromCart(item.id))
    // update boolean cart's length
    // to prevent adding more than 5 products to cart
    dispatch(setCartItemsLength())
  }

  return (
    <li key={item.id} className="my-2 border-bottom pb-2">
      <div className="row mx-0 justify-content-center align-items-center">
        <div className="col-1 px-0">
          <button
            className="btn btn-mini-seagreen"
            type="submit"
            disabled={!item.stock}
            onClick={handleDecrement}
          >
          -
          </button>
          <div className="text-center pl-1">{item.quantity}</div>
          <button
            className="btn btn-mini-seagreen"
            type="submit"
            disabled={!item.stock}
            onClick={handleIncrement}
          >
          +
          </button>
        </div>
        <div className="col-3">
          <img style={{ width: '66px', height: 'auto' }} src={item.image} className="" alt={item.name} />
        </div>
        <div className="col-6">
          <p style={{ fontSize: '0.8rem' }}>{item.name}</p>
          <p className="text-right font-weight-bold mb-0" style={{ fontSize: '0.8rem' }}>{thaiCurrencyFormat(item.price)}</p>
        </div>
        <div className="col-1 px-0 align-self-start">
          <button
            className="btn btn-mini-red"
            type="submit"
            disabled={!item.stock}
            onClick={handleRemove}
          >
          x
          </button>
        </div>
      </div>
    </li>
  )
}
