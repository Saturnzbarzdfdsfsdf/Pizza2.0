import React from 'react'
import axios from 'axios'
import qs from 'qs'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice'

import {
	Categories,
	SortPopup,
	PizzaBlock,
	PizzaLoadingBlock,
	Pagination,
} from '../components'
import { sortList } from '../components/SortPopup'

function Home({ searchValue }) {
	// redux
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)

	const { categoryId, sort, currentPage, quantityPerPage } = useSelector(
		state => state.filter
	)
	// const categoryId = useSelector(state => state.filter.categoryId)
	// const sortType = useSelector(state => state.filter.sort.sortProperty)

	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	//  Change category redux
	const onChangeCategory = index => {
		dispatch(setCategoryId(index))
	}
	//              Change Page redux
	const paginate = pageNumber => {
		dispatch(setCurrentPage(pageNumber))
	}

	const fetchPizzas = async () => {
		setIsLoading(true)

		const category = categoryId > 0 ? `&category=${categoryId}` : ''
		const search = searchValue ? `&name=${searchValue}*` : ''

		await axios
			.get(
				`https://95615a27e7e2262f.mokky.dev/items?
					${category}&sortBy=${sort.sortProperty}${search}`
			)
			.then(res => {
				setItems(res.data)
				setIsLoading(false)
			})
		}
		
// Если был первый рендер, то запрашиваем пиццы 
	React.useEffect(() => {
		if (isSearch.current) {
			fetchPizzas()
		}
		isSearch.current = true;
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

//	Если был первый ренденр, то проверяем URL парам sav redux
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = sortList.find(
				obj => obj.sortProperty === params.sortProperty
			)

			dispatch(
				setFilters({
					...params,
					sort,
				})
			)
			isSearch.current = true;
		}
	}, [])
// Если изменили параметры и был первый рендер 
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})

			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort.sortProperty, currentPage])

	//               Get Current Posts:
	const indexOfLastPost = currentPage * quantityPerPage
	const indexOfFirstPost = indexOfLastPost - quantityPerPage
	const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost)

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
