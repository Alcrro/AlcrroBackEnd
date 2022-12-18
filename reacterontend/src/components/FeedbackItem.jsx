import {FaTimes,FaEdit} from 'react-icons/fa'
import PropTypes  from 'prop-types'
// import { useState } from 'react';
import Card from './shared/Card';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';


function FeedbackItem({item}) {
	const {deleteFeedback,editFeedback} = useContext(FeedbackContext)
	///how to use local useState 
	// const [rating, setRating] = useState(11);
	// const [text, setText] = useState('Example from useState');

	//change useState
	//const handleClick = () =>{
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
	//}


	return (
		<Card  >
			<div className="num-display">{item.rating}</div>
			<button onClick={() => deleteFeedback(item.id)} className='close' >
				<FaTimes color='red'/>
			</button>
			<button onClick={() => editFeedback(item)} className='edit'>
				<FaEdit color='purple' />
			</button>
			<div className="text-display">
				{item.text}
			</div>
		</Card>
	)
}

FeedbackItem.prototype ={
	item: PropTypes.object.isRequired
}


export default FeedbackItem
