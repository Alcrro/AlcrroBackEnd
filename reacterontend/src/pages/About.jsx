import Card from '../components/shared/Card'
import {Link} from 'react-router-dom'
import React from 'react'

function About() {
	return <Card>
		<div className="about">
			<h1>About This Project</h1>
			<p>This is React app to leave feedback for a product or service</p>
			<p>version 1.0.0</p>
			<p>
				<Link to="/">Back to home</Link>
			</p>
		</div>
	</Card>
}

export default About
