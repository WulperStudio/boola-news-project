import React, { useState, useEffect } from "react"
import Router from "next/router"
import axios from "axios"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import AsideFixed from "@wulpers-ui/core/components/containers/AsideFixed/AsideFixed"
import Menu from "@wulpers-ui/core/components/molecules/Menu/Menu"
import TextField from "@wulpers-ui/core/components/atoms/Form/TextField"
import Dropzone from "@wulpers-ui/core/components/atoms/DropZone"
import Fab from "@wulpers-ui/core/components/atoms/Fab"
import FormLabel from "@wulpers-ui/core/components/atoms/FormLabel"
import Typography from "@wulpers-ui/core/components/atoms/Typography"
import Switch from "@wulpers-ui/core/components/atoms/Switch"
import FilterIcon from "@wulpers-ui/core/components/icons/Filter"
import { getSessionData } from "../../../utils/middleware"

const slug = require("slug")

export default function Create({ token, domain, dataSession, dataBlog }: any) {
  console.log("dataSession>>>", JSON.stringify(dataSession))
  const [data, setData] = useState({
    title: "",
    content: "",
    slug: "",
    status: "Draft",
    publishedDate: "",
    shares: 0,
    reach: 0,
    views: 0,
    leads: 0,
    winned: 0,
    image: [],
    blog: dataBlog,
    responsable: dataSession
  })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])


  function createPost(preview: boolean) {
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
        return axios.post(`${process.env.strapiServer}/posts`, { ...data, image: res.data }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            console.log("Data: ", response.data)
            if (preview) {
              return Router.push(`/${response.data.slug}`)
            } else {
              return Router.push("/admin/campaigns/table-view")
            }
          })
          .catch(error => {
            console.log("An error occurred:", error.response)
          })
      })
      .catch(err => {
        console.log(err)
        return err
      })
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
          onClick: () => createPost(true),
          type: "Button"
        },
        {
          title: "Create",
          onClick: () => createPost(false),
          type: "Button"
        }]}
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
          POST DESCRIPTION -> Title section
        </Typography>
        <div style={{ padding: "12px 0" }}>
          <TextField label="Title" fullWidth defaultValue={data.title} value={data.title}
                     onChange={e => setData({ ...data, title: e.target.value, slug: slug(e.target.value) })} />
        </div>
        <div style={{ padding: "12px 0" }}>
          <TextField label="Slug" fullWidth defaultValue={data.slug} value={data.slug} InputProps={{ readOnly: true }}
                     onChange={e => setData({ ...data, slug: e.target.value })} />
        </div>
        <div style={{ padding: "12px 0" }}>
          <FormLabel size="small" component="legend">Attach image</FormLabel>
          {<Dropzone
            onChange={(files: any) => {
              setImages(files)
            }}
          />}
        </div>
        <div style={{ padding: "12px 0" }}>
          <FormLabel size="small" component="legend">Status</FormLabel>
          <Switch
            checked={data.status === "Publish"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({
              ...data,
              status: e.target.checked ? "Publish" : "Draft",
              publishedDate: e.target.checked ? Date.now().toString() : ""
            })}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />{data.status}
        </div>
        <br />
        <Typography gutterBottom variant="h6" component="h2" color="primary">
          CONTENT -> Title section
        </Typography>
        <div style={{ padding: "12px 0" }}><TextField label="Paragraph" fullWidth multiline rows={4}
                                                      defaultValue={data.content} value={data.content}
                                                      onChange={e => setData({ ...data, content: e.target.value })} />
        </div>

      </AsideFixed>
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData