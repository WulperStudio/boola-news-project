import { createMuiTheme } from "@material-ui/core/styles"  // @ts-ignore
import {
  poppinsRegular,
  poppinsItalic,
  poppinsBold,
  poppinsBoldItalic,
  poppinsLight,
  poppinsLightItalic
} from "./typography"

export const defaultTheme = createMuiTheme({
  typography: {
    fontFamily: "Poppins",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [poppinsRegular, poppinsItalic, poppinsBold,
          poppinsBoldItalic, poppinsLight, poppinsLightItalic]
      }
    }
  },
  palette: {
    text: {
      primary: "#3D3769"
    },
    primary: {
      main: "#7155F6"
    }
  }
})

export const darkTheme = createMuiTheme({})
