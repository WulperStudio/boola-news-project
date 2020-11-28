import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  sidebar: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  menu: {
    width: "82px",
    height: "100%",
    margin: "16px 0px",
    display: "flex",
    padding: "0px 16px",
    boxSizing: "border-box",
    alignItems: "center",
    borderRight: "1px solid #ECECFB",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  logo: {
    padding: "0px 16px",
    borderRight: "1px solid #ECECFB"
  },
  fab: {
    margin: "8px 0"
  },
  white:{
    background: "#FFF"
  }
}))

export default useStyles
