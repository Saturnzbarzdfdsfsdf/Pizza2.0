import React from 'react'
import ContentLoader from 'react-content-loader'

function LoadingBlock() {
	return (
		<ContentLoader
		className='pizza-block'
			speed={2}
			width={280}
			height={460}
			viewBox='0 0 280 460'
			backgroundColor='#f3f3f3'
			foregroundColor='#ecebeb'
		>
			<circle cx='140' cy='121' r='120' />
			<rect x='0' y='251' rx='6' ry='6' width='280' height='25' />
			<rect x='112' y='270' rx='0' ry='0' width='0' height='1' />
			<rect x='145' y='361' rx='0' ry='0' width='0' height='1' />
			<rect x='0' y='292' rx='6' ry='6' width='280' height='85' />
			<rect x='0' y='391' rx='6' ry='6' width='95' height='32' />
			<rect x='69' y='401' rx='0' ry='0' width='0' height='11' />
			<rect x='157' y='118' rx='0' ry='0' width='4' height='7' />
			<rect x='164' y='26' rx='0' ry='0' width='2' height='25' />
			<rect x='129' y='387' rx='20' ry='20' width='150' height='43' />
		</ContentLoader>
	)
}

export default LoadingBlock
