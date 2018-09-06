/* eslint-disable */

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('main.db')

db.serialize(function () {
	// db.run("CREATE TABLE lorem (info TEXT)")

	// var stmt = db.prepare("INSERT INTO lorem VALUES (?)")
	// for (var i = 0; i < 10; i++) {
	// 	stmt.run("Ipsum " + i)
	// }
	// stmt.finalize()

	db.each("SELECT * FROM t_student", function (err, row) {
		console.log(row)
	})
	db.each("insert into t_student (name) values ('lina')", function (err, row) {
		console.log(row)
	})
})

db.close()

 