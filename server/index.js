const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const ParentRouter = require('./router/parent.router')
const Config = require('./common/config')

const hostname = Config.hostname;
const port = Config.portname;
const mongoDbUrl = Config.mongoDbUrl;

mongoose.connect(mongoDbUrl)
app.use(bodyParser.json())
app.use(morgan('dev'))
app.get('/', (req,res) => {
    res.send('Hi')
})
ParentRouter.routerConfig(app)

server.listen(port, hostname, () => {
    console.log(`Server listening on ${hostname}:${port}`);
})