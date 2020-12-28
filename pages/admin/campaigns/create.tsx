import React, { useEffect, useState } from "react"
import Router, { useRouter } from "next/router"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import AsideFixed from "@wulpers-ui/core/components/containers/AsideFixed/AsideFixed"
import Menu from "@wulpers-ui/core/components/molecules/Menu/Menu"
import TextField from "@wulpers-ui/core/components/atoms/Form/TextField"
import Fab from "@material-ui/core/Fab"
import FormLabel from "@material-ui/core/FormLabel"
import EditIcon from "@material-ui/icons/Edit"
import Typography from "@material-ui/core/Typography"
import Switch from "@material-ui/core/Switch"
import { getSessionData } from "../../../utils/middleware"
import axios from "axios"

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
    blog: dataBlog,
    "responsable": dataSession
  })

  function createPost() {
    return axios.post(`${process.env.strapiServer}/posts`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Data: ", response.data)
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
                    title: "Create",
                    onClick: createPost,
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