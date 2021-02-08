import axios from "axios"

export const getCommentsbyDomain = (domain: string, token: string) =>
  axios
    .get(`${process.env.strapiServer}/comments?domain=${domain}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data)
    .catch(error => error.response)

export const createComment = (formData: any, token: string) =>{
  return axios.post(`${process.env.strapiServer}/comments`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

export const createMessage = (formData: any, token: string) =>{
    return axios.post(`${process.env.strapiServer}/messages-comments`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  }
