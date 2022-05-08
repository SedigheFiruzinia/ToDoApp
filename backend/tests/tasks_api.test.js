const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('getting data when there are 7 tasks in db', () => {

  test('tasks are returned as json', async () => {
    const response = await api
      .get('/api/tasks')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(7)
  })

  test('those are identified by field id', async () => {
    const response = await api
      .get('/api/tasks')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
  })

  test('fails if getting an unexisted task', async () => {
    await api.get('/api/tasks/80').expect(404)
  })

})

describe('updating the state of a task', () => {

  test('a task can be updated', async () => {
    const aTaskAtStart = await api.get('/api/tasks/2').expect(200)
    await api.put('/api/tasks/2').expect(200)
    const taskAtEnd = await api.get('/api/tasks/2').expect(200)

    expect(aTaskAtStart.body.state).not.toBe(taskAtEnd.body.state)
  })
  
  test('fails if updating an unexisted task', async () => {
    await api.put('/api/tasks/80').expect(404)
  })

})

describe('db tasks content', () => {

  test('the first task is about test backend', async () => {
    const response = await api.get('/api/tasks')

    expect(response.body[0].text).toBe('test backend')
  })

  test('a specific task is within the returned tasks', async () => {
    const response = await api.get('/api/tasks')

    const texts = response.body.map((r) => r.text)
    expect(texts).toContain('design frontend')
  })
})