import Login from './views/login.vue'
import NotFound from './views/404.vue'
import NoPermission from './views/noPermission.vue'
import Home from './views/home.vue'

const UserManagement_proxyURL = resolve => require(['./views/accountMng/userMngment.proxyURL.vue'], resolve)

let routes = [
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/404',
		component: NotFound,
	}
];

export default routes;
