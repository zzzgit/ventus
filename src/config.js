
let token = null
let ab = 3
export default {
	//env: NODE_ENV ? NODE_ENV : "dev",
	getDomain() {
		if (ab > 2) {
			return "http://127.0.0.1:19999"
		}
		return {
			dev: "http://172.28.200.22:9190",
			qa: "http://104.199.226.50:9190",
			production: "http://admin.kzih6287.com/apis"
		}["dev"]
	},
	getToken() {
		if (!token) {
			token = sessionStorage.getItem("token")
		}
		return token
	},
	clear() {
		sessionStorage.removeItem('user')
		sessionStorage.removeItem('oid')
		sessionStorage.removeItem('id')
		sessionStorage.removeItem('token')
		sessionStorage.removeItem("ownerLogo")
		token = null
	},
	getOid() {
		return "foroid"
	},
	constants: {
		version: 'v1.1.93',

	}
}
