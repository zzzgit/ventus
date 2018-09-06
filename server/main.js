const Koa = require('koa')
var cors = require('koa2-cors')
var sqlite3 = require('sqlite3').verbose()

const app = new Koa()
app.use(cors())
var db = new sqlite3.Database('./main.db')

app.use(ctx => new Promise(resolve => {
	switch (ctx.url) {
		case "/api/query/students":
			db.serialize(() => {
				db.each("SELECT * FROM t_student", (err, rows) => {
					console.log(rows)
					ctx.body = {
						code: 200,
						msg: "",
						data: rows
					}
					resolve()
				})
			})
			break
		case "/api/kkd":
			resolve()
			break
		default:
			ctx.body = 'Hello World'
			resolve()
	}
}))
// db.serialize(function () {
// 	db.run("CREATE TABLE lorem (info TEXT)")

// 	var stmt = db.prepare("INSERT INTO lorem VALUES (?)")
// 	for (var i = 0; i < 10; i++) {
// 		stmt.run("Ipsum " + i)
// 	}
// 	stmt.finalize()
// })

app.listen(9999)
//db.close()
