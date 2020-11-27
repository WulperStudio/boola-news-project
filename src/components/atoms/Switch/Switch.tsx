import React from "react"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Table from "../../../assets/icons/Table"
import Group from "../../../assets/icons/Group"

export default function ToggleButtonSizes() {
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      top: "7px",
      position: "relative"
    },
    fab: {
      width: "40px",
      height: "40px",
      background: "#EEEDF3",
      color: "#B9C0DE",
      borderRadius: "50%",
      display: "inherit",
      alignItems: "inherit",
      justifyContent: "inherit"
    },
    left: {
      borderRadius: "50px",
      padding: "2px 8px 2px 4px",
      border: "none",
      background: "#EEEDF3",
      "&.Mui-selected": {
        backgroundColor: "#EEEDF3",
        "&:hover": {
          backgroundColor: "#EEEDF3"
        },
        "& div": {
          background: "#FFF",
          color: "#3D3769"
        }
      }
    },
    right: {
      borderRadius: "50px",
      padding: "2px 4px 2px 8px",
      border: "none",
      background: "#EEEDF3",
      "&.Mui-selected": {
        backgroundColor: "#EEEDF3",
        "&:hover": {
          backgroundColor: "#EEEDF3"
        },
        "& div": {
          background: "#FFF",
          color: "#3D3769"
        }
      }
    }
  }))

  const classes = useStyles()
  const [alignment, setAlignment] = React.useState("table")

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment)
  }

  return (
    <ToggleButtonGroup
      size="medium"
      value={alignment}
      exclusive
      onChange={handleChange}
      className={classes.root}
    >
      <ToggleButton value="table" className={classes.left}>
        <div className={classes.fab}>
          <Table/>
        </div>
      </ToggleButton>
      <ToggleButton value="cards" className={classes.right}>
        <div className={classes.fab}>
          <Group/>
        </div>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
