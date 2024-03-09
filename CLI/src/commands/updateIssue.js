import axios from 'axios'

const baseURL = "http://localhost:3000"

export const updateIssue = async ({ id, updatedTitle, updatedDescription }) => {
  if (updatedTitle.length > 0 && updatedDescription.length > 0) {
    const updateIssue = await axios.put(`${baseURL}/issue/${id}`, { id, updatedTitle, updatedDescription })
    console.log(updateIssue.data)
  } else if (updatedTitle.length > 0 && updatedDescription.length === 0) {
    const updateIssue = await axios.put(`${baseURL}/issue/${id}`, { id, updatedTitle })
    console.log(updateIssue.data)
  } else {
    const updateIssue = await axios.put(`${baseURL}/issue/${id}`, { id, updatedDescription })
    console.log(updateIssue.data)
  }
}