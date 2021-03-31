import React from "react"
import Router from "next/router"
import Table from "@wulpers-ui/core/components/organisms/Table/Table"
import FilterIcon from "@wulpers-ui/core/components/icons/Filter"

const LandingsTable = ({
  data,
  setLoading,
  deletePost,
  publishPost,
  loading,
}) => {
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

  return (
    <Table
      loading={loading}
      idTable="id"
      headCells={headCells}
      formatRows={formatRows}
      dataRows={data}
      imagesPath={process.env.strapiServer}
    />
  )
}

export default LandingsTable
