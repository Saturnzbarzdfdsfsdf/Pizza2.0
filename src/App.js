import React from 'react'

import { Header } from './components'
import { Home, Cart, NotFound } from './pages'
import { Route, Routes } from 'react-router-dom'



function App() {

	const [searchValue, setSearchValue ] = React.useState('')

	// console.log(searchValue, 'input')

	return (
		<div className='wrapper'>
			<Header searchValue={searchValue} setSearchValue={setSearchValue} />
			<div className='content'>
				<Routes>
					<Route path='/' element={<Home searchValue={searchValue} />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
