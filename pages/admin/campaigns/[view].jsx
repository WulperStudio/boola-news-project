import React from "react"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import Router, { useRouter } from "next/router"
import Plus from "@wulpers-ui/core/components/icons/Plus"
import Table from "@wulpers-ui/core/components/organisms/Table/Table"
import { formatRows, dataRows, headCells } from "@wulpers-ui/core/components/organisms/Table/dataMoock"
import GridContainer from "@wulpers-ui/core/components/containers/Grid"
import Card from "@wulpers-ui/core/components/molecules/Card"

const Campaigns = () => {
  const route = useRouter()
  const navBarConfig = [
    {
      title: "Switch",
      onClick: function(view) {
        Router.push(`/admin/campaigns/${view}-view`)
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

  return (
    <AdminTheme title="**Campaigns**" buttonBackOnClick={() => Router.push("/admin")} navBarConfig={navBarConfig}>
      {(route.query.view === "table-view") && (
        <Table
          idTable="id"
          headCells={headCells}
          formatRows={formatRows}
          dataRows={dataRows}
        />
      )}
      {(route.query.view === "cards-view") && (
        <GridContainer>
          {dataRows.map(data => (
            <Card
              title="Flipp, la aplicación mas increíble de todos los tiempos llego a Brasil"
              avatar="https://material-ui.com/static/images/avatar/3.jpg"
              action={
                <button>t</button>
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

export default Campaigns
