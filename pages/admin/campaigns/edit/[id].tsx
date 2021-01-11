import React, { useEffect, useState } from "react"
import Router, { useRouter } from "next/router"
import axios from "axios"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import AsideFixed from "@wulpers-ui/core/components/containers/AsideFixed/AsideFixed"
import Menu from "@wulpers-ui/core/components/molecules/Menu/Menu"
import TextField from "@wulpers-ui/core/components/atoms/Form/TextField"
import Dropzone from "@wulpers-ui/core/components/atoms/DropZone"
import FormLabel from "@wulpers-ui/core/components/atoms/FormLabel"
import Typography from "@wulpers-ui/core/components/atoms/Typography"
import Switch from "@wulpers-ui/core/components/atoms/Switch"
import Fab from "@wulpers-ui/core/components/atoms/Fab"
import FilterIcon from "@wulpers-ui/core/components/icons/Filter"
import { getSessionData } from "../../../../utils/middleware"

const slug = require("slug")

export default function EditByID({ token, domain }: any) {
  const route = useRouter()
  const [data, setData] = useState({
    title: "",
    content: "",
    slug: "",
    status: "Draft",
    publishedDate: "",
    image: []
  })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [titleError, setTitleError] = useState(false)
  const [slugError, setSlugError] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [contentError, setContentError] = useState(false)

  useEffect(() => {

    axios.get(`${process.env.strapiServer}/posts/${route.query.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Data>>>", response.data)
        setData(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log("An error occurred:", error.response)
      })
  }, [])

  function updatePost(preview: boolean) {
    if (!data.title || !data.slug || !images.length || !data.content) {
      setTitleError(!data.title)
      setSlugError(!data.slug)
      setImageError(!images.length)
      setContentError(!data.content)
    } else {
      setLoading(true)
      const formData = new FormData()
      images.forEach(image => {
        formData.append("files", image)
      })

      return axios
        .post(`${process.env.strapiServer}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
        })
        .then(res => {
            return axios.put(`${process.env.strapiServer}/posts/${route.query.id}`, { ...data, image: res.data }, {
              headers: { "Authorization": `Bearer ${token}` }
            })
              .then(response => {
                //setLoading(false)
                console.log("Data: ", JSON.stringify(response.data))
                if (preview) {
                  return Router.push(`/${data.slug}`)
                } else {
                  return Router.push("/admin/campaigns/table-view")
                }
              })
              .catch(error => {
                console.log("An error occurred:", error.response)
              })
          }
        )
        .catch(err => {
          console.log(err)
          return err
        })
    }
  }

  return (
    <AdminTheme
      title=""
      buttonBackOnClick={() => {
        setLoading(true)
        Router.push("/admin/campaigns/table-view")
      }}
      navBarConfig={[
        {
          title: "Preview",
          onClick: () => updatePost(true),
          type: "Button"
        },
        {
          title: "Save",
          onClick: () => updatePost(false),
          type: "Button"
        }
      ]}
      loading={loading}
    >
      <AsideFixed asideContent={
        <Menu
          button={
            <Fab
              color="inherit"
              size="medium"
              aria-label="edit"
            >
              <FilterIcon />
            </Fab>
          }
          items={["Insert image", "Insert video", "Insert phrase", "Insert URL", "Insert subtitle"]}
        />
      }>
        <Typography gutterBottom variant="h6" component="h2" color="primary">
          {`POST DESCRIPTION -> Title section`}
        </Typography>

        <div style={{ padding: "12px 0" }}>
          <TextField
            label="Title"
            error={titleError}
            helperText={titleError ? "Incorrect entry." : ""}
            fullWidth
            value={data.title}
            onChange={(e: any) => {
              setTitleError(false)
              setSlugError(false)
              setData({ ...data, title: e.target.value, slug: slug(e.target.value) })
            }} />
        </div>

        <div style={{ padding: "12px 0" }}>
          <TextField
            label="Slug"
            error={slugError}
            helperText={slugError ? "Incorrect entry." : ""}
            fullWidth
            value={data.slug}
            InputProps={{ readOnly: true }}
            onChange={(e: any) => {
              setSlugError(false)
              setData({ ...data, slug: e.target.value })
            }} />
        </div>

        <div style={{ padding: "12px 0" }}>
          <FormLabel error={imageError} size="small" component="legend">Attach image</FormLabel>
          {data.image.length > 0 && (
            <Dropzone
              error={imageError}
              helperText={imageError ? "Incorrect entry." : ""}
              initialFiles={[process.env.strapiServer + data.image[0].url]}
              onChange={(files: any) => {
                setImageError(false)
                setImages(files)
              }}
            />
          )}
          {data.image.length === 0 && (
            <Dropzone
              error={imageError}
              helperText={imageError ? "Incorrect entry." : ""}
              onChange={(files: any) => {
                setImageError(false)
                setImages(files)
              }}
            />
          )}
        </div>

        <div style={{ padding: "12px 0" }}>
          <FormLabel size="small" component="legend">Status</FormLabel>
          <Switch
            checked={data.status === "Publish"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({
                ...data,
                status: e.target.checked ? "Publish" : "Draft",
                publishedDate: e.target.checked ? Date.now().toString() : ""
              })
            }}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />{data.status}
        </div>

        <div style={{ padding: "12px 0" }}>
          <TextField
            label="Description"
            error={contentError}
            helperText={contentError ? "Incorrect entry." : ""}
            fullWidth multiline
            rows={4}
            value={data.content}
            onChange={(e: any) => {
              setContentError(false)
              setData({ ...data, content: e.target.value })
            }} />
        </div>

        <br />

        {/*<Typography gutterBottom variant="h6" component="h2" color="primary">
          {`CONTENT -> Title section`}
        </Typography>

          <div style={{padding: "12px 0"}}>
          <TextField label="Paragraph" fullWidth multiline rows={4} value={data.content}
          onChange={e => setData({...data, content: e.target.value})} />
          </div>*/}

      </AsideFixed>

    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData