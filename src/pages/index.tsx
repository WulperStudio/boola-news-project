import React, { ReactElement } from "react"
import Admin from "../components/template/Admin/Admin"
import NavBar from "../components/molecules/NavBar/NavBar"
import Button from "@material-ui/core/Button"
import Hidden from "@material-ui/core/Hidden"

export default function Home(): ReactElement {
  return <Admin>

    <NavBar title='Analyzing path of *_import & validation_*'>
      <Hidden smDown>
        <Button variant="outlined" color="primary" size="large">Message</Button>
        <Button variant="contained" color="primary" size="large">Create</Button>
      </Hidden>
    </NavBar>
    Hello world!
  </Admin>
}
