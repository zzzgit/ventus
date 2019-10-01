// const path = require("path")
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-body-parser')
const cors = require('koa2-cors')
const sqlite3 = require('sqlite3').verbose()
// const { importSchema } = require('graphql-import')
// const { makeExecutableSchema } = require('graphql-tools')
// const { graphql } = require('graphql')	//GraphQLSchema, GraphQLObjectType, GraphQLString
// const graphqlHTTP = require('koa-graphql')
const { ApolloServer, gql } = require('apollo-server-koa')


let db = new sqlite3.Database('./main.db')
const app = new Koa()
app.use(cors())
app.use(bodyParser())



const router = new Router()

// const typeDefs = importSchema(path.resolve(__dirname, './gql/schema.graphql'))
// const schema = makeExecutableSchema({ typeDefs })

app.use(router.routes())
const server = new ApolloServer({
	typeDefs: gql`
		type Number {
			id: Int,
			number: String
			price: Int
		}
		type Tsp {
			id: Int,
			name: String
			symbol: String
		}

		type Query {
			number(id: Int): [Number],
			tsp: [Tsp],
		}
	`, 
	resolvers :{
		Query: {
			number: () => {
				return [
					{ id: 3, number: "15217620985", price: 22 },
					{ id: 4, number: "15217620986", price: 22 },
					{ id: 5, number: "15217620987", price: 22 },
				]
			}
		}
	} 
})

server.applyMiddleware({ app })

// app.use(ctx => new Promise(resolve => {
// 	switch (ctx.url) {
// 		case "/api/query/numbers":
// 			db.serialize(() => {
// 				// db.run("CREATE TABLE lorem (info TEXT)");
// 				db.all("SELECT * FROM t_number", (err, rows) => {
// 					console.log("\r\n")
// 					console.log(rows)
// 					ctx.body = {
// 						code: 200,
// 						msg: "",
// 						data: rows
// 					}
// 					resolve()
// 				})
// 			})
// 			break
// 		case "/api/query/students":
// 			db.serialize(() => {
// 				db.all("SELECT * FROM t_student", (err, rows) => {
// 					console.log(rows)
// 					ctx.body = {
// 						code: 200,
// 						msg: "",
// 						data: rows
// 					}
// 					resolve()
// 				})
// 			})
// 			break
// 		case "/api/kkd":
// 			resolve()
// 			break
// 		default:
// 			ctx.body = 'Hello World'
// 			resolve()
// 	}
// }))





app.listen(19999)
//db.close()


