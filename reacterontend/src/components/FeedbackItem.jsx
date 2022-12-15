import React from 'react';
import { useState } from 'react';

function FeedbackItem() {
	//how to use local useState 
	const [rating, setRating] = useState(11);
	const [text, setText] = useState('Example from useState');

	//change useState
	const handleClick = () =>{
		// setRating(69)
		///Access previous rating and change it to 69 
		// setRating(() =>{
		// 	return 69
		// })

		///Access previous rating and change increment by 1
		// setRating((prev) =>{
		// 	console.log(prev);
		// 	return prev + 1
		// })
	}

	return (
		<div  className='card'>
			<div className="num-display">{rating}</div>
			<div className="text-display">
				{text}
			</div>
			<button onClick={handleClick}>Click</button>
		</div>
	)
}

export default FeedbackItem
