import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  navBar: {
    width: "100%",
    height: "64px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },
  title: {
    fontSize: "1.25rem",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    lineHeight: "1.6",
    margin: 0
  },
  bold: {
    fontWeight: 700
  },
  boldUnderlined: {
    fontWeight: 700,
    borderBottom: "3px solid #613EEA"
  },
  buttonBack: {
    background: "none",
    border: "none",
    boxShadow: "none",
    marginRight: "16px",
    color: "#5F6062"
  },
  buttonsContainer: {
    "& .MuiButton-root": {
      marginLeft: "16px"
    }
  }
}))

export default useStyles
