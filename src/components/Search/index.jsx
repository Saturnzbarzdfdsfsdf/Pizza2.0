import React from 'react'
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'

import { SearchContext } from '../../App'

const Search = () => {
	
	const inputRef = React.useRef()

	const [value, setValue] = React.useState()
	const {searchValue, setSearchValue } = React.useContext(SearchContext)

	const updateSearchValue = React.useCallback(
		debounce(string => {
			setSearchValue(string)
		}, 500),
		[],
	)

	const onChangeInput = event => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	const onClickClear = () => {
		setValue('')
		setSearchValue('')
		// document.querySelector('input').focus();
		inputRef.current.focus()
	}
	
	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				transform='rotate(0)matrix(1, 0, 0, 1, 0, 0)'
			>
				<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
				<g
					id='SVGRepo_tracerCarrier'
					strokeLinecap='round'
					strokeLinejoin='round'
					stroke='#CCCCCC'
					strokeWidth='0.624'
				></g>
				<g id='SVGRepo_iconCarrier'>
					<g clipPath='url(#clip0_15_152)'>
						<rect width='24' height='24' fill='white'></rect>
						<circle
							cx='10.5'
							cy='10.5'
							r='6.5'
							stroke='#000000'
							strokeLinejoin='round'
						></circle>
						<path
							d='M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z'
							fill='#000000'
						></path>
					</g>
					<defs>
						<clipPath id='clip0_15_152'>
							<rect width='24' height='24' fill='white'></rect>
						</clipPath>
					</defs>
				</g>
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Search pizzas..'
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={styles.close}
					viewBox='0 0 64.00 64.00'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					stroke='#000000'
				>
					<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
					<g
						id='SVGRepo_tracerCarrier'
						strokeLinecap='round'
						strokeLinejoin='round'
					></g>
					<g id='SVGRepo_iconCarrier'>
						<line x1='16' y1='16' x2='48' y2='48'></line>
						<line x1='48' y1='16' x2='16' y2='48'></line>
					</g>
				</svg>
			)}
		</div>
	)
}

export default Search
