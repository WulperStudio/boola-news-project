import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "16px"
  },
  cardHeader: {
    padding: "0 0 16px"
  },
  avatar: {},
  action: {},
  container: {
    borderTop: "1px solid #000",
    paddingTop: "16px",
    display: "flex",
    justifyContent: "space-around"
  },
  col: {
    textAlign: "center"
  }
})

export default useStyles;
