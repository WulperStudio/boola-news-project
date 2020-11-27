import React, { ReactElement } from "react"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import Avatar from "@material-ui/core/Avatar"
import useStyles from "./Card.styles"
import Quantity from "../../atoms/Quantity/Quantity"

type QuantityProp = {
  title: string,
  detail: string | number,
}

type Props = {
  title: string,
  quantities: QuantityProp[],
  avatar: string,
  action: ReactElement
}

export default function SimpleCard({ title, quantities, avatar, action }: Props) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar src={avatar} alt={title} aria-label="recipe" className={classes.avatar}/>
        }
        action={action}
        title={title}
      />
      <div className={classes.container}>
        {quantities.map(({ title, detail }) => (
          <Quantity title={title} detail={detail}/>
        ))}
      </div>
    </Card>
  )
}
