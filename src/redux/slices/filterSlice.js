import { createSlice } from '@reduxjs/toolkit'

//	item
const initialState = {
	quantityPerPage: 4,
	activePage: 1,
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
		setActivePage(state, action) {
			state.activePage = action.payload
		},
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
		setFilters(state, action) {
			state.currentPage = Number(action.payload.currentPage)
			state.categoryId = Number(action.payload.categoryId)
			state.sort = action.payload.sort
		},
	},
})

export const { setCategoryId, setSort, setCurrentPage, setActivePage, setFilters } =
	filterSlice.actions

export default filterSlice.reducer
