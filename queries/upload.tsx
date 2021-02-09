import axios from "axios"

export const deleteFileById = (id: string, token: string) =>
  axios.delete(`${process.env.strapiServer}/upload/files/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  })

export const deleteMassivelyFilesById = (ids: string[], token: string) =>
  axios.all(ids.map((id: any) => deleteFileById(id, token)))

export const uploadFile = (file: any, token: string) => {
  const formData = new FormData()
  formData.append("files", file)
  return axios.post(`${process.env.strapiServer}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  })
}

export const uploadMultipleFiles = (files: any, token: string) =>
  axios.all(files.map((file: any) => uploadFile(file, token)))
