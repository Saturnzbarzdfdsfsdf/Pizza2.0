import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setActivePage, setCurrentPage } from '../../redux/slices/filterSlice'

import styles from './Pagination.module.scss'

const Pagination = ({
	quantityPerPage,
	totalPosts,
	paginate,
}) => {

	const pageNumber = []

	for (let i = 1; i <= Math.ceil(totalPosts / quantityPerPage); i++) {
		pageNumber.push(i)
	}
	
	const dispatch = useDispatch()
		const { activePage, currentPage} = useSelector(state => state.filter)


	const handlePageClick = number => setActivePage(number)

	const next = () => {
		dispatch(setCurrentPage(currentPage + 1))
		dispatch(setActivePage(activePage + 1))
	} 
		
	const prev = () => {
			dispatch(setCurrentPage(currentPage - 1))
			dispatch(setActivePage(activePage - 1))
	} 
		
	console.log()
	return (
		<div>
			<ul className={styles.pagination}>
				{pageNumber.map(number => (
					<li key={number}>
						<p
							className={`${styles.link} 
									${currentPage === number ? styles.active : ''}`}
							onClick={() => {
								handlePageClick(number)
								paginate(number)
							}}
						>
							{number}
						</p>
					</li>
				))}
			</ul>
			<div className='pagination__btn'>
				<button className='button' onClick={prev}>
					Prev
				</button>
				<button className='button' onClick={next}>
					Next
				</button>
			</div>
		</div>
	)
}

export default Pagination
