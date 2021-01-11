import React, { useState, useEffect } from "react"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import Router, { useRouter } from "next/router"
import Plus from "@wulpers-ui/core/components/icons/Plus"
import Table from "@wulpers-ui/core/components/organisms/Table/Table"
import GridContainer from "@wulpers-ui/core/components/containers/Grid"
import DeleteIcon from "@material-ui/icons/Delete"
import Fab from "@material-ui/core/Fab"
import axios from "axios"
import Card from "@wulpers-ui/core/components/molecules/Card"
import { getSessionData } from "../../../utils/middleware"
import createPalette from "@material-ui/core/styles/createPalette"

const Campaigns = ({ token, domain }) => {
  const route = useRouter()
  const [dataRows, setDataRows] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.strapiServer}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      // Handle success.
      console.log("Data: ", response.data)
      setDataRows(response.data.filter((post: any) => post.blog.domain === domain))
    })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error.response)
      })
  }, [])

  const navBarConfig = [
    {
      title: "Switch",
      onClick: function(view: string) {
        if (view) {
          Router.push(`/admin/campaigns/${view}-view`)
        }
      },
      type: "Switch"
    },
    {
      title: "Fav",
      icon: <Plus />,
      onClick: function() {
        Router.push("/admin/campaigns/create")
      },
      type: "Fav"
    }
  ]

  const headCells = [
    { key: "posttitle", label: "Posttitle" },
    { key: "status", label: "Status" },
    { key: "publishedDate", label: "Published date" },
    { key: "responsable", label: "Responsable" },
    { key: "shares", label: "Shares" },
    { key: "reach", label: "Reach" },
    { key: "views", label: "Views" },
    { key: "leads", label: "Leads" },
    { key: "winned", label: "Winned" },
    { key: "id", label: "Spread" }
  ]

  const formatRows = [
    {
      key: "title", align: "left", disablePadding: true, onClick: function(id: any) {
        setLoading(true)
        Router.push(`/admin/campaigns/edit/${id}`)
      }
    },
    { key: "status", align: "center", chip: true },
    { key: "publishedDate", align: "left", formatDate: "dd/MM/yyyy" },
    { key: "responsable.fullName", align: "left", image: "responsable.avatar[0].formats.thumbnail.url" },
    { key: "shares", align: "center" },
    { key: "reach", align: "center" },
    { key: "views", align: "center" },
    { key: "leads", align: "center" },
    { key: "winned", align: "center" },
    {
      key: "id", align: "center", button: <DeleteIcon />, onClick: DeletePost
    }
  ]

  function DeletePost(id: string) {
    return axios.delete(`${process.env.strapiServer}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      // Handle success.
      console.log("Data: ", response.data)
      setDataRows(dataRows.filter((post: any) => post.id !== id))
    }).catch(error => {
      // Handle error.
      console.log("An error occurred:", error.response)
    })
  }

  return (
    <AdminTheme title="**Campaigns**" buttonBackOnClick={() => Router.push("/admin")} navBarConfig={navBarConfig}
                loading={loading}>
      {(route.query.view === "table-view") && (
        <Table
          loading={dataRows.length === 0}
          idTable="id"
          headCells={headCells}
          formatRows={formatRows}
          dataRows={dataRows}
          imagesPath={process.env.strapiServer}
        />
      )}
      {(route.query.view === "cards-view") && (
        <GridContainer>
          {dataRows.map(data => (
            <Card
              title={data.title}
              avatar={process.env.strapiServer + data.responsable.avatar[0].formats.thumbnail.url}
              action={
                <Fab size="small" style={{ background: "#FFF", color: "#613EEA" }}>
                  <DeleteIcon onClick={() => {
                    alert("hola")
                  }} />
                </Fab>
              }
              quantities={[
                { title: "Shares", detail: data.shares },
                { title: "Reach", detail: data.reach },
                { title: "Views", detail: data.views },
                { title: "Leads", detail: data.leads },
                { title: "Winned", detail: data.winned }
              ]}
            />
          ))}
        </GridContainer>
      )}
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData

export default Campaigns
