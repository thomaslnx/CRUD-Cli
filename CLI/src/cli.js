import cors from 'cors'
import express from 'express'
import axios from 'axios'

import readline from 'readline'

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

const getIssues = async () => {
  const getIssues = await axios.get(`${baseURL}/issues`)
  console.log(getIssues.data)
}

server.listen(port, () => console.log(`Server up and running at port ${port}`))