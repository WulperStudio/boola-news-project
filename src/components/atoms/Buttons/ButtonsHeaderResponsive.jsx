import React from "react"
import Button from "@material-ui/core/Button"
import Fab from "@material-ui/core/Fab"
import Hidden from "@material-ui/core/Hidden"
import useStyles from "./ButtonsHeaderResponsive.styles"

export default function ButtonsHeaderResponsive({ variant, title, disabled, icon, color }) {
  const  classes = useStyles()
  return (
    <>
      <Hidden smDown>
        <Button variant={variant} disabled={disabled} color={color}>
          {title}
        </Button>
      </Hidden>
      <Hidden mdUp>
        <Fab size="small" className={classes.fav} >
          {icon}
        </Fab>
      </Hidden>
    </>
  )
}