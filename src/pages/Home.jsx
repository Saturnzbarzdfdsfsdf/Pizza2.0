import React from 'react'
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'

import {
	Categories,
	SortPopup,
	PizzaBlock,
	PizzaLoadingBlock,
	Pagination,
} from '../components'

function Home({ searchValue }) {
	// redux
	const dispatch = useDispatch()
	const {categoryId, sort} = useSelector(state => state.filter)
	// const categoryId = useSelector(state => state.filter.categoryId)
	// const sortType = useSelector(state => state.filter.sort.sortProperty)

	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	// Pagination
	const [currentPage, setCurrentPage] = React.useState(1)
	const [quantityPerPage] = React.useState(4)

	// redux
	const onChangeCategory = index => {
		dispatch(setCategoryId(index))
	}

	React.useEffect(() => {
		const fetchPizzas = async () => {
			setIsLoading(true)

			const sortBy = sort.sortProperty
			const category = categoryId > 0 ? `&category=${categoryId}` : ''
			const search = searchValue ? `&name=${searchValue}*` : ''

			 await axios.get(`https://95615a27e7e2262f.mokky.dev/items?
		${category}&sortBy=${sortBy}${search}`)
			.then((res) => {
				setItems(res.data)
				
				setIsLoading(false)
			})

		}
		fetchPizzas()
	}, [categoryId, sort.sortProperty, searchValue])

	//               Get Current Posts:
	const indexOfLastPost = currentPage * quantityPerPage
	const indexOfFirstPost = indexOfLastPost - quantityPerPage
	const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost)

	//              Change Page
	const paginate = pageNumber => setCurrentPage(pageNumber)
	//								Button Pagination

	const pizzas = currentPosts.map(obj => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(12)].map((_, index) => (
		<PizzaLoadingBlock key={index} />
	))

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<SortPopup value={sort.sortProperty} onChangeSort={onChangeCategory} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination
				setCurrentPage={setCurrentPage}
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