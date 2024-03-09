import express, { Express, Request, Response } from 'express'
const cors = require('cors')

const server: Express = express()
server.use(cors())
server.use(express.json())

let exampleIssues = [
  {
    id: 1,
    title: "Example Issue 1",
    description: "Example description Issue 1",
  },
  {
    id: 2,
    title: "Example Issue 2",
    description: "Example description Issue 2",
  },
]

server.get('/issues', (req: Request, res: Response) => {
  return res.json(exampleIssues)
})

server.post('/issues', (req: Request, res: Response) => {
  const newIssue = { id: Date.now(), ...req.body }
  exampleIssues.push(newIssue)

  return res.status(201).json(newIssue)
})

server.listen(3000, () => console.log('Server up and running!'))