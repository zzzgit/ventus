import React from 'react'
import ReactDOM from 'react-dom'
import 'element-theme-default'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from "apollo-boost"
import './base.css'
import App from './view/App'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
	uri: "http://127.0.0.1:19999/graphql"
})

let AppWrapper = (
	<ApolloProvider client={client} >
		<App />
	</ApolloProvider >)
ReactDOM.render(AppWrapper, document.getElementById('root'))
registerServiceWorker()
