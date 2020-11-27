import React from "react"
import useStyles from "./Quantity.styles"

type Props = {
  title: string,
  detail: string | number
}

export default function Quantity({ title, detail }: Props) {
  const classes = useStyles()
  return (
    <div className={classes.quantity}>
      <div className={classes.title}>{title}</div>
      <div className={classes.detail}>{detail}</div>
    </div>
  )
}
