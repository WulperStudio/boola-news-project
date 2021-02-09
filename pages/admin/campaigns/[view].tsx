import React, { useState, useEffect } from "react"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import Router, { useRouter } from "next/router"
import Plus from "@wulpers-ui/core/components/icons/Plus"
import Table from "@wulpers-ui/core/components/organisms/Table/Table"
import GridContainer from "@wulpers-ui/core/components/containers/Grid"
import Fab from "@wulpers-ui/core/components/atoms/Fab"
import axios from "axios"
import Card from "@wulpers-ui/core/components/molecules/Card"
import FilterIcon from "@wulpers-ui/core/components/icons/Filter"

import { getSessionData } from "../../../utils/middleware"
import { getAllPostByDomain } from "../../../queries"

const Campaigns = ({ token, domain }) => {
  const route = useRouter()
  const [dataRows, setDataRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [rowsLoading, setRowsLoading] = useState(true)

  useEffect(() => {
    getAllPostByDomain(domain, token)
      .then(response => {
        console.log("response>>>",response)
        setRowsLoading(false)
        setDataRows(response.data)
      })
      .catch(error => {
        console.error("An error occurred:", error.response)
      })
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [route.query.view])

  const navBarConfig = [
    {
      title: "Switch",
      onClick: function (view: string) {
        if (view) {
          setLoading(true)
          Router.push(`/admin/campaigns/${view}-view`)
        }
      },
      type: "Switch",
    },
    {
      title: "Fav",
      icon: <Plus />,
      onClick: function () {
        setLoading(true)
        Router.push("/admin/campaigns/create")
      },
      type: "Fav",
    },
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
    { key: "id", label: "Spread" },
  ]

  const formatRows = [
    {
      key: "title",
      align: "left",
      disablePadding: true,
      onClick: function (id: any) {
        setLoading(true)
        Router.push(`/admin/campaigns/edit/${id}`)
      },
    },
    { key: "status", align: "center", chip: true },
    { key: "publishedDate", align: "left", formatDate: "dd/MM/yyyy" },
    {
      key: "responsable.fullName",
      align: "left",
      image: "responsable.avatar[0].formats.thumbnail.url",
    },
    { key: "shares", align: "center" },
    { key: "reach", align: "center" },
    { key: "views", align: "center" },
    { key: "leads", align: "center" },
    { key: "winned", align: "center" },
    {
      key: "id",
      align: "center",
      button: <FilterIcon />,
      menu: [
        { title: "Delete", onClick: deletePost },
        { title: "Publish", onClick: publishPost },
      ],
    },
  ]

  function deletePost(id: string) {
    return axios
      .delete(`${process.env.strapiServer}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // Handle success.
        console.error("Data: ", response.data)
        setDataRows(dataRows.filter((post: any) => post.id !== id))
      })
      .catch(error => {
        // Handle error.
        console.error("An error occurred:", error.response)
      })
  }

  function publishPost(id: string) {
    return axios
      .put(
        `${process.env.strapiServer}/posts/${id}`,
        {
          status: "Publish",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(response => {
        // Handle success.
        console.error("Data: ", response.data)
        /*let data = dataRows
      dataRows.filter((post: any) => post.id === id).status = ""
      setDataRows(dataRows.filter((post: any) => post.id === id).status = "" )*/
      })
      .catch(error => {
        // Handle error.
        console.error("An error occurred:", error.response)
      })
  }

  return (
    <AdminTheme
      title="**Campaigns**"
      buttonBackOnClick={() => Router.push("/admin")}
      navBarConfig={navBarConfig}
      loading={loading}
    >
      {route.query.view === "table-view" && (
        <Table
          loading={rowsLoading}
          idTable="id"
          headCells={headCells}
          formatRows={formatRows}
          dataRows={dataRows}
          imagesPath={process.env.strapiServer}
        />
      )}
      {route.query.view === "cards-view" && (
        <GridContainer>
          {dataRows.map(
            ({
              title,
              responsable,
              shares,
              reach,
              views,
              leads,
              winned,
            }: any) => (
              <Card
                title={title}
                avatar={
                  responsable?.avatar[0]?.formats
                    ? process.env.strapiServer +
                      responsable.avatar[0].formats.thumbnail.url
                    : null
                }
                action={
                  <Fab
                    size="small"
                    style={{ background: "#FFF", color: "#613EEA" }}
                  >
                    <FilterIcon
                      onClick={() => {
                        alert("hola")
                      }}
                    />
                  </Fab>
                }
                quantities={[
                  { title: "Shares", detail: shares },
                  { title: "Reach", detail: reach },
                  { title: "Views", detail: views },
                  { title: "Leads", detail: leads },
                  { title: "Winned", detail: winned },
                ]}
              />
            )
          )}
        </GridContainer>
      )}
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData

export default Campaigns
