import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: null,
  totalPrice: null,
  isFiveItems: false
}

export const CartSlice = createSlice({
  name: 'robots',
  initialState,
  reducers: {
    addToCartByVal (state, action) {
      const { amount, id, image, name, price, quantity, stock } = action.payload
      // before adding to cart
      // confirm the length is less than five
      if (!state.isFiveItems) {
        state.items.push({ amount, id, image, name, price, quantity, stock })
        state.totalQuantity += quantity
        state.totalPrice += amount
      }
    },
    updateItemQtyByVal (state, action) {
      // updated item was sent from RobotItem line 75-82
      const updatedItem = action.payload
      // finds item in the cart and updates it's quantity
      const items = state.items.map(item =>
        item.id === updatedItem.id
          ? {
            ...item,
            quantity: item.quantity + Number(updatedItem.quantity),
            amount: item.amount + Number(updatedItem.amount)
          }
          : item
      )
      state.items = items
      // update total values
      state.totalQuantity += updatedItem.quantity
      state.totalPrice += updatedItem.amount
    },
    incrementQtyByOne (state, action) {
      const itemToAdjust = state.items.find(item => item.id === action.payload)
      const items = state.items.map(item =>
        item.id === itemToAdjust.id
          ? {
            ...item,
            quantity: item.quantity + 1,
            amount: item.amount + Number(itemToAdjust.price)
          }
          : item
      )
      state.items = items
      state.totalQuantity += 1
      state.totalPrice += Number(itemToAdjust.price)
    },
    decrementQtyByOne (state, action) {
      const itemToAdjust = state.items.find(item => item.id === action.payload)
      const items = state.items.map(item =>
        item.id === itemToAdjust.id
          ? {
            ...item,
            quantity: item.quantity - 1,
            amount: item.amount - Number(itemToAdjust.price)
          }
          : item
      )
      state.items = items
      state.totalQuantity -= 1
      state.totalPrice -= Number(itemToAdjust.price)
    },
    removeFromCart (state, action) {
      const itemToRemove = state.items.find(item => item.id === action.payload)
      const remainingItems = state.items.filter(item => item.id !== itemToRemove.id)
      state.items = remainingItems
      if (itemToRemove.quantity === 0) {
        alert('Item removed')
      } else {
        state.totalPrice -= itemToRemove.amount
        state.totalQuantity -= itemToRemove.quantity
      }
    },
    setCartItemsLength (state) {
      if (state.items.length === 5) {
        state.isFiveItems = true
      } else {
        state.isFiveItems = false
      }
    }
  }
})

export const { addToCartByVal, updateItemQtyByVal, removeFromCart, incrementQtyByOne, decrementQtyByOne, setCartItemsLength } = CartSlice.actions

export default CartSlice.reducer

export const getAllItems = state => state.cart.items

export const getTotalQuantity = state => state.cart.totalQuantity

export const getTotalPrice = state => state.cart.totalPrice

export const getItemById = (state, itemId) => state.cart.items.find(item => item.id === itemId)
