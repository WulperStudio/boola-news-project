import { createMuiTheme } from "@material-ui/core"  // @ts-ignore
import {
  poppinsRegular,
  poppinsItalic,
  poppinsBold,
  poppinsBoldItalic,
  poppinsLight,
  poppinsLightItalic
} from "./typography"
import { backgrounds, text } from "./colors"

export const defaultTheme = createMuiTheme({
  typography: {
    fontFamily: "Poppins"
  },
  palette: {
    primary: {
      main: backgrounds.primary,
    },
    secondary: {
      main: backgrounds.secondary,
      contrastText: '#FFF'
    },
    text: {
      primary: text.primary
    }
  }
})

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF0000",
    }
  }
})
