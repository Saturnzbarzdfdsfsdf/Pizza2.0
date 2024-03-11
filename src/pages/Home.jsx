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

	// Pagination
	const [currentPage, setCurrentPage] = React.useState(1)
	const [quantityPerPage] = React.useState(4)

	const [categoryId, setCategoryId] = React.useState(0)

	const [sortType, setSortType] = React.useState({
		name: 'Популярности',
		sortProperty: 'rating',
	})

	React.useEffect(() => {
		const fetchPizzas = async () => {
			setIsLoading(true)

			const sortBy = sortType.sortProperty
			const category = categoryId > 0 ? `&category=${categoryId}` : ''
			const search = searchValue ? `&name=${searchValue}*` : ''

			const res = await fetch(`https://95615a27e7e2262f.mokky.dev/items?
		${category}&sortBy=${sortBy}${search}`)
			const data = await res.json()
			setItems(data)

			setIsLoading(false)
		}
		fetchPizzas()
	}, [categoryId, sortType, searchValue])

	//               Get Current Posts:
	const indexOfLastPost = currentPage * quantityPerPage
	const indexOfFirstPost = indexOfLastPost - quantityPerPage
	const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost)

	//              Change Page
	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	const pizzas = currentPosts.map(obj => (
		<PizzaBlock key={obj.id} {...obj} />
	))

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
				quantityPerPage={quantityPerPage}
				totalPosts={items.length}
				paginate={paginate}
			/>
		</div>
	)
}

export default Home

	// 		fetch(`https://95615a27e7e2262f.mokky.dev/items?
	// 		${category}&sortBy=${sortBy}${search}
	// `)
	// 			.then(res => res.json())
	// 			.then(json => {
	// 				setItems(json)
	// 				setIsLoading(false)
	// 			})
	// 		window.scrollTo(0, 0)
	// 	}, [categoryId, sortType, searchValue])