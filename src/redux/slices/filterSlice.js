import { createSlice } from '@reduxjs/toolkit'

//	item
const initialState = {
	currentPage: 1,
	categoryId: 0,
	sort: {
		name: 'Популярности',
		sortProperty: 'rating',
	},
}
// setItem
export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
	},
})

export const { setCategoryId, setSort, setCurrentPage } =
	filterSlice.actions

export default filterSlice.reducer
