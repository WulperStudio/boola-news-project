import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Grid, { GridProps } from "@material-ui/core/Grid"

const useStyles = makeStyles({
  root: {},
  cardMedia: {
    borderRadius: "10px",
    maxHeight: "275px"
  }
})

type Props = {
  variant?: "type1" | "type2" | "type3"
}

CardBlog.defaultProps = {
  variant: "type1"
}

export default function CardBlog({ variant }: Props) {
  const classes = useStyles()
  // @ts-ignore
  let xs: GridProps.xs = 12
  // @ts-ignore
  let direction: GridProps.direction = "column"

  if (variant === "type2") {
    xs = 6
    direction = "row"
  }
  if (variant === "type3") {
    xs = 6
    direction = "row-reverse"
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Grid
          container
          direction={direction}
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs={xs}>
            <CardContent>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                image="/card-image.png"
                title="Contemplative Reptile"
                className={classes.cardMedia}
              />
            </CardContent>
          </Grid>
          <Grid item xs={xs}>
            <CardContent>
              <span>MEDIA</span>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <p>
                This is the second part of the SMM starter pack series of articles. If you made it this far, you must be
                willing to learn about promoting business through social media
              </p>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  )

}