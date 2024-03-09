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

server.put('/issue/:id', (req: Request, res: Response) => {
  const { updatedTitle, updatedDescription } = req.body
  console.log('req.body', req.body)
  console.log('description: ', updatedDescription)
  const issue = exampleIssues.filter(issue => {
    if (issue.id === parseInt(req.params.id)) {
      updatedTitle !== undefined ? issue.title = updatedTitle : null
      updatedDescription !== undefined ? issue.description = updatedDescription : null

      return res.status(200).json(issue)
    }
  })

  if (!issue) {
    return res.status(404).send("The issue you're looking for doesn't exist!")
  }
})

server.delete('/issue/:id', (req: Request, res: Response) => {
  const issue = exampleIssues.find((issue, issueIndex) => {
    if (issue.id === parseInt(req.params.id)) {
      exampleIssues.splice(issueIndex, 1)
      return res.json(issue)
    }
  })
})

server.listen(3000, () => console.log('Server up and running!'))