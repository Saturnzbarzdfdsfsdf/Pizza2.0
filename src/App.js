import React from 'react'

import { Header } from './components'
import { Home, Cart, NotFound } from './pages'
import { Route, Routes } from 'react-router-dom'

export const SearchContext = React.createContext()

function App() {
	const [searchValue, setSearchValue] = React.useState('')
	
	return (
		<div className='wrapper'>
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home searchValue={searchValue} />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	)
}

export default App
