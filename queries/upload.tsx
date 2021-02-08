import axios from "axios"

export const deleteFileId = (id: any, token: string) =>
  axios.delete(`${process.env.strapiServer}/upload/files/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  })

export const uploadFile = (formData,token) =>
  axios.post(`${process.env.strapiServer}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  })
