import axios from "axios"

export const getAllPostByDomain = (domain, token: string) =>
  axios.get(`${process.env.strapiServer}/posts?domain=${domain}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const getPostById = (id: any, token: string) =>
  axios.get(`${process.env.strapiServer}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const countPostByDomainAndSlug = (domain: string, slug:string, token: string) =>
  axios.get(`${process.env.strapiServer}/posts/count?domain=${domain}&slug=${slug}`, {
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
