import React from 'react'
import ReactDOM from 'react-dom'
import 'element-theme-default'
import './base.css'
import App from './view/App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
