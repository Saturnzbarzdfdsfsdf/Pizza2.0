import { createSlice } from '@reduxjs/toolkit'

//	items
const initialState = {
	categoryId: 0,
	sort: {
		name: 'Популярности',
		sortProperty: 'rating',
	},
	currentPage: 1,
}
// setItems
export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
	},
})

export const { setCategoryId, setSort, setCurrentPage } =
	filterSlice.actions

export default filterSlice.reducer
