




db.serialize(() => {
	// db.run("CREATE TABLE lorem (info TEXT)");
	db.all("SELECT * FROM t_number", (err, rows) => {
		console.log("\r\n")
		console.log(rows)
		ctx.body = {
			code: 200,
			msg: "",
			data: rows
		}
		resolve()
	})
})
db.serialize(function () {
	db.run("CREATE TABLE lorem (info TEXT)")

	var stmt = db.prepare("INSERT INTO lorem VALUES (?)")
	for (var i = 0; i < 10; i++) {
		stmt.run("Ipsum " + i)
	}
	stmt.finalize()
})
