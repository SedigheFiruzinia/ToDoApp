const express = require('express')
const app = express()
const {tasksRouter} = require('./controllers/tasks')

const { requestLogger } = require('./utils/middleware')

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/tasks', tasksRouter)

module.exports = app
