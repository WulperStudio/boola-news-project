import React, { ReactElement, ReactNode } from "react"
import useStyles from "./NavBar.styles"
import Fab from "@material-ui/core/Fab"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import reactStringReplace from "react-string-replace"

type Props = {
  title: string,
  showButtonBack?: boolean,
  children?: ReactNode,
}
NavBar.defaultProps = {
  showButtonBack: false
}

export default function NavBar({ children, title, showButtonBack }: Props): ReactElement {
  const classes = useStyles()
  let replacedTitle = reactStringReplace(title, /\*\*(.*)\*\*/g, (match: string, i: number) => (
    <span className={classes.bold}>{match}</span>
  ))
  replacedTitle = reactStringReplace(replacedTitle, /\*\_(.*)\_\*/g, (match: string, i: number) => (
    <b className={classes.boldUnderlined}>{match}</b>
  ))

  return (
    <nav className={classes.navBar}>
      <h6 className={classes.title}>
        {showButtonBack && (
          <Fab color="inherit" aria-label="add" className={classes.buttonBack} size="medium">
            <ArrowBackIcon/>
          </Fab>
        )}
        {replacedTitle}
      </h6>
      {children && (
        <div className={classes.buttonsContainer}>
          <>{children}</>
        </div>
      )}
    </nav>
  )
}

