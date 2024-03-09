import axios from 'axios'

const baseURL = "http://localhost:3000"

export const deleteIssue = async (id) => {
  const deleteIssue = await axios.delete(`${baseURL}/issue/${id}`)
  console.log('Issue Deleted: ', deleteIssue.data)
}