/* global  */
import globalConfig from './config.js'
import { fix } from './utils.js'

export const queryStudentList = (body, pager, timeout) => { return post(`${globalConfig.getDomain()}/api/query/students`, body, pager, timeout) }
export const queryNumberList = (body, pager, timeout) => { return post(`${globalConfig.getDomain()}/api/query/numbers`, body, pager, timeout) }
export const payOwnerConfigGetPayOwnerConfigInfo = (body) => { return get(`${globalConfig.getDomain()}/payOwnerConfig/getPayOwnerConfigInfo`, body) }

const fetchTimeout = 1000 * 14
const get = (url, body = {}, timeout) => {
	fix(body)
	let paras = ""
	for (let key in body) {
		paras += (key + "=" + body[key] + "&")
	}
	url += paras ? ("?" + paras.substring(0, paras.length - 1)) : ""
	let f = fetch(url, { method: "GET", headers: { token: globalConfig.getToken() } })
		.then(resp => resp.ok ? resp : new Error("网络异常！"))
		.then((resp) => resp.json())
		.then((data) => {
			if (data.code != 200) {
				console.info("GET请求失败：" + data.msg)
				let error = new Error(data.msg)
				error.code = data.code
				error.type = 110
				throw error
			}
			return data.data
		})
	return new Promise(function (resolve, reject) {
		f.then(resolve, reject)
		let t = window.setTimeout(() => {
			reject(new Error('Timed Out!'))
			window.clearTimeout(t)
		}, timeout, fetchTimeout)
	})
}
const post = (url, body, pager, timeout) => {
	console.log("post请求，带入参数：", body)
	if (pager) {
		body = Object.assign({}, body, { "pageNo": pager.pageNo, "pageSize": pager.pageSize })
		body.orderSort = body.orderSort || pager.orderSort
		body.orderField = body.orderField || pager.orderField
	}
	body.orderField = body.orderField || "createTime"
	body.orderSort = body.orderSort || "desc"
	fix(body)
	let f = fetch(url, { method: "POST", headers: { token: globalConfig.getToken(), "content-type": "application/json" }, body: JSON.stringify(body) })
		.then(resp => resp.ok ? resp : new Error("网络异常！"))
		.then((resp) => resp.json())
		.then((data) => {
			if (data.code != 200) {
				console.info("POST请求失败：" + data.msg)
				let error = new Error(data.msg)
				error.code = data.code
				error.type = 110
				throw error
			}
			return data.data
		})
	return new Promise((resolve, reject) => {
		f.then(resolve, reject)
		let t = window.setTimeout(() => {
			reject(new Error('Timed Out!'))
			window.clearTimeout(t)
		}, (timeout || fetchTimeout))
	})
}

// const upload = (url, body) => {
// 	let headers = {
// 		"token": globalConfig.getToken()
// 	}
// 	return fetch(url, { method: "POST", headers: headers, body: body })
// 		.then(resp => resp.ok ? resp : new Error("网络异常！"))
// 		.then((resp) => {
// 			if (globalConfig.fileFlag.export == 1)
// 				return resp
// 			else
// 				return resp.json()
// 		}).then((data) => {
// 			if (globalConfig.fileFlag.export == 1) {
// 				globalConfig.fileFlag.export = 0
// 				return data
// 			} else {
// 				if (data.code != 200) {
// 					console.info("GET请求失败：" + data.msg)
// 					let error = new Error(data.msg)
// 					error.code = data.code
// 					error.type = 110
// 					throw error
// 				}
// 				globalConfig.fileFlag.export = 0
// 				return data.data
// 			}
// 		})
// }
// const downLoad = (url, body, pager, timeout) => {
// 	console.log("post请求，带入参数：", body)
// 	if (pager) {
// 		body = Object.assign({}, body, { "pageNo": pager.pageNo, "pageSize": pager.pageSize, })
// 		if (!body.orderSort) {
// 			body.orderSort = pager.orderSort
// 			body.orderField = pager.orderField
// 		}
// 	}
// 	fix(body)
// 	if (fix1(body)) {
// 		// return Promise.reject(new Error("failed"))
// 		let e = new Error("不支持输入表情请重新输入")
// 		e.type = 102
// 		return new Promise(function (resolve, reject) { reject(e) })
// 	}
// 	if (!body.orderSort) {
// 		body.orderField = "createTime"
// 		body.orderSort = "desc"
// 	}
// 	let f = fetch(url, { method: "POST", headers: { token: globalConfig.getToken(), "HTTP-CUST-OID": globalConfig.distribution === 0 ? 10000 : (+foroid), "content-type": "application/vnd.ms-excel" }, body: JSON.stringify(body, pager) })
// 		.then(resp => resp.ok ? resp : new Error("网络异常！"))
// 		.then((resp) => resp.json())
// 		.then(function (data) {
// 			if (data.code != 200) {
// 				console.info("POST请求失败：" + data.msg)
// 				let error = new Error(data.msg)
// 				error.code = data.code
// 				error.type = 110
// 				throw error
// 			}
// 			return data.data
// 		})
// 	return new Promise(function (resolve, reject, time) {
// 		f.then(resolve, reject)
// 		let t = window.setTimeout(function name(params) {
// 			reject(new Error('Timed Out!'))
// 			window.clearTimeout(t)
// 		}, (timeout || fetchTimeout))
// 	})
// }
