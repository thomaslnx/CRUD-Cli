import axios from 'axios'

const baseURL = "http://localhost:3000"

export const getIssues = async () => {
  const getIssues = await axios.get(`${baseURL}/issues`)
  console.log(getIssues.data)
}