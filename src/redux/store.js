// create ctore
import { configureStore } from '@reduxjs/toolkit'

import filter from '../redux/slices/filterSlice'


export const store = configureStore({
	reducer: { 
    filter,
  },
})
