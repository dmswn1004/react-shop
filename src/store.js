import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : 'kim',
  reducers : {
    changeName(){
      return 'john kim'
    }
  }
})

export let { changeName } = user.actions

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    addCount(state, action){
      let id = action.payload;
      let item = state.find(item => item.id === id);
      if (item) {
        item.count += 1;
      }
    },
    minusCount(state, action){
      let id = action.payload;
      let item = state.find(item => item.id === id);
      if (item) {
        item.count -= 1;
      }
    }
  }
})

export let { addCount, minusCount } = cart.actions

export default configureStore({
  reducer: { 
    user : user.reducer,
    cart : cart.reducer
   }
}) 