import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import {defaultTheme} from "../utils"
import Button from "@material-ui/core/Button"

function DeepChild() {
  return (
    <Button variant="contained" color="primary">
      Theming
    </Button>
  )
}

export default function Theming() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <DeepChild />
    </ThemeProvider>
  )
}
