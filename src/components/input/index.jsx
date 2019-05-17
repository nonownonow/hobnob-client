import React from 'react';

function Input (props) {
	return (
		<label>
			{props.label}
			<input id={props.id} type={props.type} onChange={e=>props.onChange(props.name, e )}/>
			<div className="indicator" style={{
				height: '20px',
				width: '20px',
				backgroundColor: getIndicatorColor(props)
			}}/>
		</label>
	)
}

function getIndicatorColor (state) {
	if (state.valid === null || state.value.length === 0) {
		return 'transparent'
	}
	return state.valid ? 'green' : 'red'
}
export default Input
