let MongoClient = require('mongodb').MongoClient

let uri = "mongodb://admin:admin@206.189.157.234:27017/test?authSource=admin"




module.exports = {
	hello: ()=>{
		let c = null
		return MongoClient.connect(uri)
			.then(client => {
				c = client
				let db = client.db('number')
				return db.collection('foo')
			})
			.then(foo=>{
				return foo.find({}).limit(2).toArray() 
			})
			.then(arr =>{
				let results = [ ]
				arr.forEach(item => {
					results.push(item)
				})
				return results
			})
			.catch(err => {
				console.log(2222, err)
			})
			.finally(()=>{
				c.close()
			})
	}
}
