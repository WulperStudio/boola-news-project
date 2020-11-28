import React from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import TextField, { TextFieldProps } from "@material-ui/core/TextField"

type Props = TextFieldProps & {
  success?: boolean
}

const CustomizedTextField = (props: Props) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      success: {
        "& ::before": {
          borderColor: "green",
          borderWidth: 2
        },
        "& fieldset": {
          borderColor: "green",
        },
        "& label": {
          color: "green"
        }
      }
    })
  )
  const classes = useStyles()
  return (
    <TextField {...props} className={props.success ? classes.success : ""} />
  )
}

export default CustomizedTextField