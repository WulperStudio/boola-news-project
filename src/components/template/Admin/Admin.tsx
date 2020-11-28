import React, { ReactNode, ReactElement } from "react"
import SideBar from "../../molecules/SideBar/SideBar"
import { defaultTheme } from "../../../utils"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import useStyles from "./Admin.styles"

type Props = {
  sidebar?: boolean
  children: ReactNode
}

Admin.defaultProps = {
  sidebar: true
}

export default function Admin({ children, sidebar }: Props): ReactElement {
  const classes = useStyles()
  return (
    <ThemeProvider theme={defaultTheme}>

      <div className={classes.container}>
        {sidebar && <SideBar/>}
        <div className={classes.content}>{children}</div>
      </div>
    </ThemeProvider>
  )
}
