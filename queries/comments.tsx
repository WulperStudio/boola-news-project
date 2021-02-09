import axios from "axios"

export const getCommentsbyDomain = (domain: string, token?: string) =>
  axios
    .get(
      `${process.env.strapiServer}/comments?domain=${domain}`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : null
    )
    .then(({ data }) => data)
    .catch(error => error.response)

export const createComment = (formData: any, token?: string) =>
  axios.post(
    `${process.env.strapiServer}/comments`, formData,
    token ? { headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`}}
    : { headers: { "Content-Type": "application/json" } }
  )

export const createMessage = (formData: any, token?: string) => 
  axios.post(
    `${process.env.strapiServer}/messages-comments`, formData,  
    token ? { headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`}}
    : { headers: { "Content-Type": "application/json" } }
  )


