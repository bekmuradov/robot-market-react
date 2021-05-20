import { configureStore } from '@reduxjs/toolkit'
import robotsReducer from '../features/products/robotsSlice'
import cartReducer from '../features/cart/cartSlice'

export default configureStore({
  reducer: {
    robots: robotsReducer,
    cart: cartReducer
  }
})
