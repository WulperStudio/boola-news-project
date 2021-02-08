import axios from "axios"

export const getPostById = (id: any, token: string) =>
  axios.get(`${process.env.strapiServer}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const updatePostById = (id: any, data: any, token: string) =>
  axios.put(`${process.env.strapiServer}/posts/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const publishPostById = (id: any, token: string) =>
  axios.put(
    `${process.env.strapiServer}/posts/${id}`,
    { status: "Publish" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
