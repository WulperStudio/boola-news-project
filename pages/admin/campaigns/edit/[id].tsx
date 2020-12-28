import React, { useEffect, useState } from "react"
import Router, { useRouter } from "next/router"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import AsideFixed from "@wulpers-ui/core/components/containers/AsideFixed/AsideFixed"
import Menu from "@wulpers-ui/core/components/molecules/Menu/Menu"
import TextField from "@wulpers-ui/core/components/atoms/Form/TextField"
import Fab from "@material-ui/core/Fab"
import EditIcon from "@material-ui/icons/Edit"
import Typography from "@material-ui/core/Typography"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { getSessionData } from "../../../../utils/middleware"
import axios from "axios"
import FormLabel from "@material-ui/core/FormLabel"
import Switch from "@material-ui/core/Switch"

export default function EditByID({ token, domain }) {
  const route = useRouter()
  const [data, setData] = useState({
    title: "",
    content: "",
    slug: "",
    status: "Draft",
    publishedDate: ""
  })

  useEffect(() => {
    axios.get(`${process.env.strapiServer}/posts/${route.query.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Data>>>", JSON.stringify(response.data))
        setData(response.data)
      })
      .catch(error => {
        console.log("An error occurred:", error.response)
      })
  }, [])

  function updatePost() {
    return axios.put(`${process.env.strapiServer}/posts/${route.query.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Data: ", JSON.stringify(response.data))
        return Router.push("/admin/campaigns/table-view")
      })
      .catch(error => {
        console.log("An error occurred:", error.response)
      })
  }

  return (
    <AdminTheme title="" buttonBackOnClick={() => Router.push("/admin/campaigns/table-view")}
                navBarConfig={[
                  {
                    title: "Save",
                    onClick: updatePost,
                    type: "Button"
                  }]}>
      <AsideFixed asideContent={
        <Menu
          button={
            <Fab
              color="inherit"
              size="medium"
              aria-label="edit"
            >
              <EditIcon />
            </Fab>
          }
          items={["Insert image", "Insert video", "Insert phrase", "Insert URL", "Insert subtitle"]}
        />
      }>
        <Typography gutterBottom variant="h6" component="h2" color="primary">
          POST DESCRIPTION -> Title section
        </Typography>
        <p>
          <TextField label="Title" fullWidth defaultValue={data.title} value={data.title}
                     onChange={e => setData({ ...data, title: e.target.value, slug: slug(e.target.value) })} />
        </p>
        <p>
          <TextField label="Slug" fullWidth defaultValue={data.slug} value={data.slug} InputProps={{ readOnly: true }}
                     onChange={e => setData({ ...data, slug: e.target.value })} />
        </p>
        <p>
          <FormLabel component="legend">Status</FormLabel>
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
        </p>
        <br />
        <Typography gutterBottom variant="h6" component="h2" color="primary">
          CONTENT -> Title section
        </Typography>
        <p><TextField label="Paragraph" fullWidth multiline rows={4} defaultValue={data.content} value={data.content}
                      onChange={e => setData({ ...data, content: e.target.value })} />
        </p>

      </AsideFixed>
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData