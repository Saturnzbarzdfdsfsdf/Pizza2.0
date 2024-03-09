import React from 'react'

import styles from './NotFoundBlock.module.scss'

function NotFoundBlock() {
	return (
		<div className={styles.root}>
			<h1 >
				<span>😢</span>
				<br />
				Ничего не найдено
			</h1>
			<p>Товар не найден, попробуйте перезагрузить страницу</p>
		</div>
	)
}

export default NotFoundBlock
