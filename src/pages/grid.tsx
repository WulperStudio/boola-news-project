import React, { ReactElement } from "react"
import Admin from "../components/template/Admin/Admin"
import Button from "@material-ui/core/Button"
import NavBar from "../components/molecules/NavBar/NavBar"
import Switch from "../components/atoms/Switch/Switch"
import GridContainer from "../components/containers/Grid/Grid"
import Card from "../components/molecules/Card/Card"
import IconButton from "@material-ui/core/IconButton"
import LinkIcon from "@material-ui/icons/Link"
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
      <NavBar title='**Grid**' showButtonBack>
        <Hidden smDown>
          <Switch/>
          <Button variant="outlined" color="primary" size="large">Notifications</Button>
          <Button variant="contained" color="primary" size="large">Create</Button>
        </Hidden>
      </NavBar>
      <GridContainer>
        <Card
          title={"Flipp, la aplicación mas increíble de todos los tiempos llego a Brasil"}
          avatar={"https://material-ui.com/static/images/avatar/3.jpg"}
          action={
            <IconButton aria-label="settings">
              <LinkIcon/>
            </IconButton>
          }
          quantities={[
            { title: "Shares", detail: "10" },
            { title: "Reach", detail: "150k" },
            { title: "Views", detail: "50k" },
            { title: "Leads", detail: "20k" },
            { title: "Convert", detail: "5k" }
          ]}
        />

        <Card
          title={"Flipp, la aplicación mas increíble de todos los tiempos llego a Brasil"}
          avatar={"https://material-ui.com/static/images/avatar/3.jpg"}
          action={
            <IconButton aria-label="settings">
              <LinkIcon/>
            </IconButton>
          }
          quantities={[
            { title: "Shares", detail: "10" },
            { title: "Reach", detail: "150k" },
            { title: "Views", detail: "50k" },
            { title: "Leads", detail: "20k" },
            { title: "Convert", detail: "5k" }
          ]}
        />

        <Card
          title={"Flipp, la aplicación mas increíble de todos los tiempos llego a Brasil"}
          avatar={"https://material-ui.com/static/images/avatar/3.jpg"}
          action={
            <IconButton aria-label="settings">
              <LinkIcon/>
            </IconButton>
          }
          quantities={[
            { title: "Shares", detail: "10" },
            { title: "Reach", detail: "150k" },
            { title: "Views", detail: "50k" },
            { title: "Leads", detail: "20k" },
            { title: "Convert", detail: "5k" }
          ]}
        />

        <Card
          title={"Flipp, la aplicación mas increíble de todos los tiempos llego a Brasil"}
          avatar={"https://material-ui.com/static/images/avatar/3.jpg"}
          action={
            <IconButton aria-label="settings">
              <LinkIcon/>
            </IconButton>
          }
          quantities={[
            { title: "Shares", detail: "10" },
            { title: "Reach", detail: "150k" },
            { title: "Views", detail: "50k" },
            { title: "Leads", detail: "20k" },
            { title: "Convert", detail: "5k" }
          ]}
        />
        <Card
          title={"Flipp, la aplicación mas increíble de todos los tiempos llego a Brasil"}
          avatar={"https://material-ui.com/static/images/avatar/3.jpg"}
          action={
            <IconButton aria-label="settings">
              <LinkIcon/>
            </IconButton>
          }
          quantities={[
            { title: "Shares", detail: "10" },
            { title: "Reach", detail: "150k" },
            { title: "Views", detail: "50k" },
            { title: "Leads", detail: "20k" },
            { title: "Convert", detail: "5k" }
          ]}
        />

      </GridContainer>

    </Admin>
  )
}
