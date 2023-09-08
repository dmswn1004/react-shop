import { createSlice } from '@reduxjs/toolkit'

let cart = createSlice({
    name : 'cart',
    initialState : [
      {id : 0, name : 'White and Black', count : 2},
      {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
      addCount(state, action){
        let item = state.find(item => item.id === action.payload);
        if (item) item.count++
      },
      minusCount(state, action){
        let item = state.find(item => item.id === action.payload);
        if (item) item.count--
      },
      addItem(state, action){
        state.push(action.payload);
      },
      deleteItem(state, action){
        state.splice(action.payload,1);
      }
    }
  })
  
  export let { addCount, minusCount, addItem, deleteItem } = cart.actions
  export default cart;