import React from 'react'

import styles from './Pagination.module.scss'

const Pagination = ({ quantityPerPage, totalPosts, paginate }) => {
	const pageNumber = []

	for (let i = 1; i <= Math.ceil(totalPosts / quantityPerPage); i++) {
		pageNumber.push(i)
	}

	const [activePage, setActivePage] = React.useState(1)

	const handlePageClick = number => setActivePage(number)
	console.log(activePage)
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
		</div>
	)
}

export default Pagination
