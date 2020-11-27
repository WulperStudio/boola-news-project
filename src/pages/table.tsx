import React, { ReactElement } from "react"
import Admin from "../components/template/Admin/Admin"
import Table from "../components/organisms/Table/Table"
import Button from "@material-ui/core/Button"
import NavBar from "../components/molecules/NavBar/NavBar"
import { dataRows, headCells } from "../components/organisms/Table/dataMoock"
import Switch from "../components/atoms/Switch/Switch"
import Hidden from "@material-ui/core/Hidden"

export default function Home(): ReactElement {
  const formatRows = [
    { key: "name" },
    { key: "calories", align: "right", chip: true },
    { key: "fat", align: "right", image: "https://material-ui.com/static/images/avatar/1.jpg" },
    { key: "carbs", align: "right" },
    { key: "protein", align: "right" }
  ]

  return (
    <Admin sidebar={false}>
      <NavBar title='**Table**' showButtonBack>
        <Hidden smDown>
          <Switch/>
          <Button variant="outlined" color="primary" size="large">Notifications</Button>
          <Button variant="contained" color="primary" size="large">Create</Button>
        </Hidden>
      </NavBar>
      {/* @ts-ignore*/}
      <Table headCells={headCells} formatRows={formatRows} dataRows={dataRows}/>
    </Admin>
  )
}
