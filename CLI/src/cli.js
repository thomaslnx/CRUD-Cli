import cors from 'cors'
import express from 'express'

import readline from 'readline'

import { getIssues } from './commands/getIssues.js'
import { createIssue } from './commands/createIssue.js'
import { updateIssue } from './commands/updateIssue.js'
import { deleteIssue } from './commands/deleteIssue.js'

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())
const port = 3001

const baseURL = "http://localhost:3000"

try {
  const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  })

  cli.prompt()

  cli.on('line', async (input) => {
    switch (input) {
      case 'getIssues':
        getIssues()
        cli.prompt()
      break;

      case 'createIssue':
        let title
        let description 
        cli.question('Type a title: ', (answer) => {
          title = answer
          cli.question('Type a description: ', (answer) => {
            description = answer
            createIssue({ title, description })
            cli.prompt()
          })
        })
      break;

      case 'updateIssue':
        let id
        let updatedTitle
        let updatedDescription
        cli.question('Type the issue id: ', (answer) => {
          id = answer
          cli.question('Type a new title or leave it blank: ', (answer) => {
            answer.length > 0 ? updatedTitle = answer : updatedTitle = ''
            cli.question('Type a new description or leave it blank: ', (answer) => {
              answer.length > 0 ? updatedDescription = answer : updatedDescription = ''

              updateIssue({ id, updatedTitle, updatedDescription })
              cli.prompt()
            })
          })
        })

      break;

      case 'deleteIssue':
        let idToDelete

        cli.question('Type the id from the issue you wanna delete: ', (answer) => {
          idToDelete = answer

          deleteIssue(idToDelete)
          cli.prompt()
        })
      break;

    }
    cli.prompt()
  })


} catch (error) {
  if (error.response) {
    console.log(error.response.status)
    console.log(error.response.data)
  } else {
    console.log(error.message)
  }
}

server.listen(port, () => console.log(`Server up and running at port ${port}`))