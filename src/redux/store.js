import { configureStore } from '@reduxjs/toolkit'
import user from './userSlice.js'
import cart from './cartSlice.js'

export default configureStore({
  reducer: { 
    user : user.reducer,
    cart : cart.reducer
   }
}) 