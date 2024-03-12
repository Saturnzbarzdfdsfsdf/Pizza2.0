import React from 'react'

import styles from './Pagination.module.scss'

const Pagination = ({
	quantityPerPage,
	totalPosts,
	paginate,
	setCurrentPage,
}) => {
	const pageNumber = []

	for (let i = 1; i <= Math.ceil(totalPosts / quantityPerPage); i++) {
		pageNumber.push(i)
	}

	const [activePage, setActivePage] = React.useState(1)

	const handlePageClick = number => setActivePage(number)

	const next = () => {
		setCurrentPage(next => next + 1) 
		setActivePage(next => next + 1)
	} 
		
	const prev = () => {
		setCurrentPage(next => next - 1)
		setActivePage(next => next - 1)
	} 
		

	// console.log(activePage)
	return (
		<div>
			<ul className={styles.pagination}>
				{pageNumber.map(number => (
					<li key={number}>
						<p
							className={`${styles.link} 
									${activePage === number ? styles.active : ''}`}
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
