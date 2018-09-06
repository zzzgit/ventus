import { React, Component } from 'react'
class Page extends Component {
	render(props) {
		return (
			<div className="page">
			aaa
				{props.children}
			</div>
		)
	}
}
export default Page
