import { createMuiTheme } from "@material-ui/core/styles"
import { primaryFont } from "./typography"
import { normalize } from "polished"

export const GlobalStyle = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          boxSizing: "border-box",
          fontSize: "16px"
        },
        "*, *:before, *:after": {
          boxSizing: inherit
        },
        body: {
          margin: 0,
          padding: "65px 0 0",
          fontFamily: primaryFont,
          "-webkit-font-smoothing": antialiased,
          "-moz-osx-font-smoothing": grayscale
        },
        main: {
          width: "90%",
          margin: "0 auto"
        }
      }
    }
  }
})
