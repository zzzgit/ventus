import React from 'react'
import { Menu } from 'element-react'
import './home.pcss'
import MemberMngment from "./MemberMngment.jsx"
import StudentMngment from "./StudentMngment.jsx"
import {
	Route, Link
} from 'react-router-dom'
import createReactClass from 'create-react-class'
let Home = createReactClass({
	onOpen() {

	},
	onClose() {

	},
	componentDidMount(){
		if (window.sessionStorage.getItem("login") !== "1"){
			const props = this.props
			props.history.push('/login')
		}
	},
	render() {
		return (
			<div className="top">
				<aside className="aside">
					<Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen} onClose={this.onClose} theme="dark">
						<Menu.SubMenu index="1" title="賬戶管理">
							<Menu.Item index="/owner">業主管理</Menu.Item>
							<Menu.Item index="/member"><Link to="/member">會員管理</Link></Menu.Item>
							<Menu.Item index="/student"><Link to="/student">學生管理</Link></Menu.Item>
						</Menu.SubMenu>
						<Menu.Item index="/game">線上遊戲</Menu.Item>
						<Menu.Item index="/fund">資金管理</Menu.Item>
					</Menu>
				</aside>
				<main className="main">
					<header className="header">
						<main className="main">
							<section className="section-left">
								<span className="icon"></span>
								<span>現金管理</span>
								<span>/</span>
								<span>出款管理</span>
							</section>
							<section className="section-right">{new Date().toISOString()}</section>
						</main>
					</header>
					<main className="container">
						<Route path={`/member`} component={MemberMngment} />
						<Route path={`/student`} component={StudentMngment} />
					</main>
				</main>
			</div>
		)
	}
}) 
export default Home
