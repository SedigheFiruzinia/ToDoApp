const tasksRouter = require('express').Router()
const logger = require('../utils/logger')
const fsPromises = require('fs').promises

tasksRouter.get('/', async (req, res) => {
  let db = await fsPromises.readFile('./db.json','binary')
  db = JSON.parse(db)
  res.json(db.tasks)
})

tasksRouter.get('/:id', async (req, res) => {
  let db = await fsPromises.readFile('./db.json','binary')
  db = JSON.parse(db)

  if (req.params.id > db.tasks.length - 1) {
    return res.status(404).json({ error: 'content missing' })
  }
  logger.info(db.tasks[req.params.id])
  res.json(db.tasks[req.params.id])
})

tasksRouter.put('/:id', async(req, res) => {
  let db = await fsPromises.readFile('./db.json','binary')
  db = JSON.parse(db)

  if (req.params.id > db.tasks.length - 1) {
    return res.status(404).json({ error: 'content missing' })
  }
  // change the task state
  db.tasks[req.params.id].state = !db.tasks[req.params.id].state
  await fsPromises.writeFile('./db.json', JSON.stringify(db))
  res.json(db)

})

module.exports = {tasksRouter}
