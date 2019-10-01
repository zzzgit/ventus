import React, { Component } from 'react'
import { BrowserRouter as Router,
	Route, 
	// eslint-disable-next-line no-unused-vars
	Redirect,
	Switch as Sw 
} from "react-router-dom"
import { Button } from 'element-react'
import './App.css'

import Home from "./Home.js"

class login extends Component {
	render() {
		return <div>
			<h2>login</h2>
			<Button onClick={this.btnClick_cb.bind(this)} type="primary">點擊這裡登錄</Button>
		</div>
	}
	btnClick_cb(){
		const props = this.props
		window.sessionStorage.setItem("login", "1")
		props.history.push('/student')
	}
}
const no = () => (
	<div>
		<h2>404</h2>
	</div>
)
class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<div>
						{/* <Redirect exact from="/" to="/student" /> */}
						<Sw>
							<Route path="/login" component={login} />
							<Route path="/404" component={no} />
							<Route path="/" component={Home} />
						</Sw>
					</div>
				</Router>
			</div>
		)
	}
}

export default App
