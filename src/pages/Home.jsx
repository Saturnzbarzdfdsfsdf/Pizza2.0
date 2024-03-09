import React from 'react'

import {
	Categories,
	SortPopup,
	PizzaBlock,
	PizzaLoadingBlock,
	Pagination,
} from '../components'

function Home({ searchValue }) {
	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	const [categoryId, setCategoryId] = React.useState(0)

	const [currentPage, setCurrentPage] = React.useState(1)
	
	const [sortType, setSortType] = React.useState({
		name: 'Популярности',
		sortProperty: 'rating',
	})

	console.log(currentPage)
	
	React.useEffect(() => {
		setIsLoading(true)
		
		const sortBy = sortType.sortProperty
		// const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `&category=${categoryId}` : ''
		const search = searchValue ? `&name=${searchValue}*` : ''
		
		fetch(`https://95615a27e7e2262f.mokky.dev/items?
		${category}&sortBy=${sortBy}${search}
`)
			.then(res => res.json())
			.then(json => {
				setItems(json)
				setIsLoading(false)
			})
			window.scrollTo(0, 0)
		}, [categoryId, sortType, searchValue, currentPage])
		
	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(12)].map((_, index) => (
		<PizzaLoadingBlock key={index} />
	))

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onChangeCategory={i => setCategoryId(i)}
				/>
				<SortPopup value={sortType} onChangeSort={i => setSortType(i)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination
			 onChangePage={ number => setCurrentPage(number) }
			 />
		</div>
	)
}

export default Home

// 	React.useEffect(() => {
// 		axios.get('http://localhost:3000/db.json').then(({data}) => {
// 			setPizzas(data.pizzas)
// 	})
//  }, [])

	 //   Поиск JS
	// const pizzas = items
	// 	.filter(obj => {
	// 		if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
	// 			return true
	// 		}

	// 		return false
	// 	})
	// 	.map(obj => <PizzaBlock key={obj.id} {...obj} />)

		// 	const sortBy = sortType.sortProperty
		// 	const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		// 	const category = categoryId > 0 ? `category= ${categoryId}` : ''
		// 	const search = searchValue ? `=*title=${searchValue}` : ''

		// 	fetch(`https://95615a27e7e2262f.mokky.dev/items?
		// ${category}&sortBy=${sortBy}&=${order}${search}`)