import axios from 'axios'

const baseURL = "http://localhost:3000"

export const createIssue = async ({ title, description }) => {
  const createIssue = await axios.post(`${baseURL}/issues`, { title, description })
  console.log(createIssue.data)
}