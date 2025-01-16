import express from 'express'
import routerApi from './routes/index.routes.js'

const app = express()

app.use(express.json())

routerApi(app)

app.listen(3000)
console.log('Server on port', 3000)