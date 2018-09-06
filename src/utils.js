export const fix = function (obj) {
	for (let key in obj) {
		if (obj[key] == null || obj[key] === Number.MAX_SAFE_INTEGER) {
			delete obj[key]
		} else {
			if (obj[key] === -999111) {
				obj[key] = " "
			} else if (obj[key].constructor.name == "Date") {
				obj[key] = (obj[key]).valueOf()
			} else if (Array.isArray(obj[key]) && (obj[key].length == 0)) {
				delete obj[key]
			} else if (typeof obj[key] === "string") {
				obj[key] = obj[key].trim()
			}
		}
	}
}
export const deleteItem = function (arr, index) {
	arr.copyWithin(index, index + 1)
	arr.length = arr.length - 1
}

export const storage = {
	get(key) {
		let temp = sessionStorage.getItem(key)
		if (!temp || temp === "") {
			return null
		}
		return JSON.parse(temp)
	},
	set(key, obj) {
		sessionStorage.setItem(key, JSON.stringify(obj))
	}
}
export const formatDateYM = function (date) { //参数可以使时间戳或者date对象
	if (date == null) {
		return ""
	}
	if (typeof date == "number") {
		date = new Date(date)
	}
	let y = date.getFullYear()
	let m = date.getMonth() + 1
	let d = date.getDate()
	if (m < 10) {
		m = "0" + m
	}
	if (d < 10) {
		d = "0" + d
	}
	return y + "-" + m
}
export const formatDate = function (date) { //参数可以使时间戳或者date对象
	if (date == null) {
		return ""
	}
	if (typeof date == "number") {
		date = new Date(date)
	}
	let y = date.getFullYear()
	let m = date.getMonth() + 1
	let d = date.getDate()
	if (m < 10) {
		m = "0" + m
	}
	if (d < 10) {
		d = "0" + d
	}
	return y + "-" + m + "-" + d
}

export const formatDateTime = function (date) {
	if (date == null) {
		return ""
	}
	if (typeof date == "number") {
		date = new Date(date)
	}
	let y = date.getFullYear()
	let m = date.getMonth() + 1
	let d = date.getDate()
	let h = date.getHours()
	let mm = date.getMinutes()
	let s = date.getSeconds()
	if (m < 10) {
		m = "0" + m
	}
	if (d < 10) {
		d = "0" + d
	}
	if (h < 10) {
		h = "0" + h
	}
	if (mm < 10) {
		mm = "0" + mm
	}
	if (s < 10) {
		s = "0" + s
	}
	return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s
}
export const formatDateYMDH = function (date) {
	if (date == null) {
		return ""
	}
	if (typeof date == "number") {
		date = new Date(date)
	}
	let y = date.getFullYear()
	let m = date.getMonth() + 1
	let d = date.getDate()
	let h = date.getHours()
	if (m < 10) {
		m = "0" + m
	}
	if (d < 10) {
		d = "0" + d
	}
	if (h < 10) {
		h = "0" + h
	}
	return y + "-" + m + "-" + d + " " + h
}
export const formatDateYMDHDian = function (date) {
	if (date == null) {
		return ""
	}
	if (typeof date == "number") {
		date = new Date(date)
	}
	let y = date.getFullYear()
	let m = date.getMonth() + 1
	let d = date.getDate()
	let h = date.getHours()
	if (m < 10) {
		m = "0" + m
	}
	if (d < 10) {
		d = "0" + d
	}
	// if (h < 10) {
	// 	h = "0" + h;
	// }
	return y + "-" + m + "-" + d + " " + h + '点'
}
let digitalFormat = function (val, digits) {
	if (val == null) {
		return null
	}
	let original = val
	val = val + ""
	let arr = val.split(".")
	if (arr.length < 2) {
		let zeros = ""
		let i = 0
		while (i < digits) {
			zeros += "0"
			i++
		}
		return original + "." + zeros
	}
	if (arr[1].length < digits) {
		let zeros = ""
		let i = arr[1].length
		while (i < digits) {
			zeros += "0"
			i++
		}
		return original + zeros
	}
	return arr[0] + "." + arr[1].substring(0, digits)
}
export const oneDigitsDecimal = function (val) {
	return digitalFormat(val, 1)
}

export const twoDigitsDecimal = function (val) {
	return digitalFormat(val, 2)
}

export const threeDigitsDecimal = function (val) {
	return digitalFormat(val, 3)
	//return numeral(val).format('0.000')
}

export const getCommonSummaries = function (param, ignoredCols, firstCol, currencyCols, customCols) {
	if (!ignoredCols) {
		ignoredCols = []
	}
	if (!firstCol) {
		firstCol = 0
	}
	if (!currencyCols) {
		currencyCols = []
	}
	if (!customCols) {
		customCols = []
	}
	const {
		columns,
		data
	} = param
	const sums = []
	columns.forEach((column, index) => {
		if (index === firstCol) {
			return sums[index] = '本页合计:'
		}
		let passDown = function (obj, pass) {
			if (pass == null) {
				return undefined
			}
			let arr = pass.split(".")
			if (arr.length == 1) {
				return obj[pass]
			}
			let result = obj
			arr.forEach(item => result = result[item])
			return result
		}
		const values = data.map(item => Number(passDown(item, column.property)))
		if (ignoredCols.includes(column.property)) {
			return sums[index] = ''
		}
		if (customCols[column.property]) {
			sums[index] = customCols[column.property](param)
			if (currencyCols.includes(column.property)) {
				sums[index] = twoDigitsDecimal(sums[index])
			}
			return sums[index]
		}
		if (values.every(value => isNaN(value))) {
			return sums[index] = ''
		}
		sums[index] = values.reduce((prev, curr) => {
			let valCurrent = Number(curr) || 0
			return prev + valCurrent
		}, 0)
		if (currencyCols.includes(column.property)) {
			sums[index] = twoDigitsDecimal(sums[index])
		}
	})
	return sums
}

export const getNowDateString = function () {
	let date = new Date()
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
}

export const getNowDateTimeString = function () {
	let date = new Date()
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()) + " " + ensure2digits(date.getHours()) + ":" + ensure2digits(date.getMinutes()) + ":" + ensure2digits(date.getSeconds())
}

export const ensure2digits = function (value) {
	if (typeof value == "string") {
		return "0" + value
	}
	if (value < 10) {
		return "0" + value
	}
	return value
}

export const buildRegionData = function (data) {
	let provinces = []
	let cities = []
	data.forEach(item => {
		if (item.pid == 0) {
			provinces.push(Object.assign({
				cities: []
			}, item))
		} else {
			cities.push(item)
		}
	})
	let result = Array.from(provinces)
	result.forEach(item => {
		item.cities = item.cities.concat(cities.filter(entity => {
			return item.id == entity.pid
		}))
	})
	return result
}

export const getDefautlTimeRange = function () {
	let now = new Date()
	let year = now.getFullYear()
	let month = now.getMonth()
	let date = now.getDate()
	return [new Date(year, month, date, 0, 0, 0), new Date(year, month, date, 23, 59, 59)]
}
export const getChinaSpecificDate = function (range) {
	let today = new Date()
	if (today.getHours() < 7) {
		today = new Date(today.valueOf() - 1000 * 60 * 60 * 24)
	}
	let year = today.getFullYear()
	let month = today.getMonth()
	let quater = Math.ceil((month + 1) / 3) - 1 	//季度跟月一样，从0开始
	let day = today.getDate()
	let week = today.getDay()
	if (week == 0) {
		week = 7
	}
	let sinicize = function sinicize(date) {
		// date.setHours(7)
		// date.setMinutes(0)
		// date.setSeconds(0)
		// date.setMilliseconds(0)
		return date
	}
	if (range == "d-1") { //昨日
		return [
			sinicize(new Date(year, month, day - 1)),
			sinicize(new Date(year, month, day - 1))
		]
	}
	if (range == "d0") { //今日
		return [
			sinicize(new Date(year, month, day)),
			sinicize(new Date(year, month, day))
		]
	}
	if (range == "d-2-0") { //近两日
		return [
			sinicize(new Date(year, month, day - 1)),
			sinicize(new Date(year, month, day))
		]
	}
	if (range == "d-3-0") { //近三日
		return [
			sinicize(new Date(year, month, day - 2)),
			sinicize(new Date(year, month, day))
		]
	}
	if (range == "d-4-0") { //近四日
		return [
			sinicize(new Date(year, month, day - 3)),
			sinicize(new Date(year, month, day))
		]
	}
	if (range == "d-5-0") { //近五日
		return [
			sinicize(new Date(year, month, day - 4)),
			sinicize(new Date(year, month, day))
		]
	}
	if (range == "d-6-0") { //近六日
		return [
			sinicize(new Date(year, month, day - 5)),
			sinicize(new Date(year, month, day))
		]
	}
	if (range == "d-7-0") { //近七日
		return [
			sinicize(new Date(year, month, day - 6)),
			sinicize(new Date(year, month, day))
		]
	}
	if (range == "d-30-0") { //近三十日
		return [
			sinicize(new Date(year, month, day - 29)),
			sinicize(new Date(year, month, day))
		]
	}
	if (range == "w0") { //本周
		return [
			sinicize(new Date(year, month, day - week + 1)),
			sinicize(new Date(year, month, day - week + 7))
		]
	}
	if (range == "w-1") { //上周
		let end = new Date(year, month, day).valueOf() - (week - 1) * 1000 * 60 * 60 * 24
		let start = end - 7 * 1000 * 60 * 60 * 24
		return [sinicize(new Date(start)), sinicize(new Date(end - 1000 * 60 * 60 * 24))]
	}
	// if (range == "m(-1)") { //从今天开始算的上月
	// 	return [
	// 		sinicize(new Date(year, month-1, day)),
	// 		sinicize(new Date(year, month, day+1))
	// 	]
	// }
	// if (range == "m(+1)") { //从今天开始算的下月
	// 	return [
	// 		sinicize(new Date(year, month, day)),
	// 		sinicize(new Date(year, month + 1, day))
	// 	]
	// }
	if (range == "m-1") { //上月
		return [
			sinicize(new Date(year, month - 1, 1)),
			sinicize(new Date(year, month, 0))
		]
	}
	if (range == "m0") { //本月
		return [
			sinicize(new Date(year, month, 1)),
			sinicize(new Date(year, month + 1, 0))
		]
	}
	if (range == "m-2-0") { //近两月
		return [
			sinicize(new Date(year, month - 1, 1)),
			sinicize(new Date(year, month + 1, 0))
		]
	}
	if (range == "m-3-0") { //近三月
		return [
			sinicize(new Date(year, (month - 2), 1)),
			sinicize(new Date(year, month + 1, 0))
		]
	}
	if (range == "m-4-0") { //近四月
		return [
			sinicize(new Date(year, (month - 3), 1)),
			sinicize(new Date(year, month + 1, 0))
		]
	}
	if (range == "m-5-0") { //近五月
		return [
			sinicize(new Date(year, (month - 4), 1)),
			sinicize(new Date(year, month + 1, 0))
		]
	}
	if (range == "m-6-0") { //近六月
		return [
			sinicize(new Date(year, (month - 5), 1)),
			sinicize(new Date(year, month + 1, 0))
		]
	}
	if (range == "m-7-0") { //近七月
		return [
			sinicize(new Date(year, (month - 6), 1)),
			sinicize(new Date(year, month + 1, 0))
		]
	}
	if (range == "m-12-0") { //近十二月
		return [
			sinicize(new Date(year, (month - 11), 1)),
			sinicize(new Date(year, month + 1, 0))
		]
	}
	if (range == "q-1") { //上季度
		return [
			sinicize(new Date(year, ((quater - 1) * 3), 1)),
			sinicize(new Date(year, ((quater - 1) * 3 + 3), 0))
		]
	}
	if (range == "q0") { //本季度
		return [
			sinicize(new Date(year, ((quater) * 3), 1)),
			sinicize(new Date(year, ((quater) * 3 + 3), 0))
		]
	}
	if (range == "q1") { //下季度
		return [
			sinicize(new Date(year, ((quater + 1) * 3), 1)),
			sinicize(new Date(year, ((quater + 1) * 3 + 3), 0))
		]
	}
	if (range == "y0") { //今年
		return [
			sinicize(new Date(year, 0, 1)),
			sinicize(new Date(year + 1, 0, 0))
		]
	}
	if (range == "ever") { //全部
		return [
			new Date(new Date(new Date(2000, 0, 1))),
			new Date(year, month, day)
		]
	}
}
export const dateStart = function (n = 1) {
	let timeStamp = []
	timeStamp[0] = (new Date(new Date().setHours(0, 0, 0, 0))).valueOf() - 86400000 * n
	timeStamp[1] = (new Date(new Date().setHours(0, 0, 0, 0))).valueOf() - 1000
	//一天是86400秒   故n天前的时间戳为
	// let ThreeDayAgo = timeStamp - 86400 * n;
	return [timeStamp[0], timeStamp[1]]
}
export const dateType1 = function (number) {
	let dateS = new Date(number)
	let dateType1 = dateS.getFullYear() + "/" + (dateS.getMonth() + 1) + "/" + dateS.getDate()
	return dateType1
}

export const palyWay = function (arr = ["", "", ""]) {
	let arrUNull = [], arrURes = []
	arr.map(item => {
		item = clearCode(item)
		if (item)//去空
			arrUNull.push(item)
	})
	arrUNull.map((item, index) => {
		if (item != arrUNull[index + 1])//去重
			arrURes.push(item)
	})
	return arrURes.join("/")
	function clearCode(param) {//去 美元符号 和 感叹号
		return param ? param.indexOf("!") >= 0 ? param.split("!").join("") : param.split("$").join("") : null
	}
}
