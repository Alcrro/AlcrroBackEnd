import React from 'react'
import './Navbar.css'

function Navbar() {
	return (
		<>
			<div className="navbar">
				<a href="/" className='logo'>ALCRRO</a>
				<div className="navbar-menu">
					<ul>
						<li>
							<a href="/home">Home</a>
						</li>
						<li>
							<a href="/login">Login</a>
						</li>
						<li>
							<a href="/logout">Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	)
}

export default Navbar
