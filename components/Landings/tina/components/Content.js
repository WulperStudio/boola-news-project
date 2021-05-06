import React from "react"
import { BlocksControls, InlineBlocks } from "react-tinacms-inline"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import { jsonParse, jsonForm } from "../utils"
import { HeadingBlock } from "./Heading"
import { ParagraphBlock } from "./Paragraph"
import { ActionsBlock } from "./Actions"
import { ImageBlock } from "./Image"
import { ListBlock } from "./List"
import { VideoBlock } from "./Video"
import { Padding } from "./Padding"

const useStyles = makeStyles({
  fixStyle: {
    "& > div": {},
  },
})

function Content({ index, data }) {
  const classes = useStyles()
  const { width, padding, margin, styles } = data
  const stylesParse = jsonParse(styles)
  return (
    <Grid
      className={classes.fixStyle}
      item
      xs={12}
      lg={width}
      id="GRID"
      style={{ padding, margin, ...stylesParse }}
    >
      <BlocksControls index={index} insetControls>
        <InlineBlocks
          focusRing={{ offset: 0 }}
          name="content"
          blocks={CONTENT_BLOCKS}
          direction="vertical"
        />
      </BlocksControls>
    </Grid>
  )
}

export const ContentBlock = {
  Component: Content,
  template: {
    label: "Content",
    defaultItem: {
      _template: "content",
      width: 6,
    },
    fields: [
      {
        name: "width",
        label: "Width",
        component: "number",
        max: 12,
        min: 1,
      },
      {
        name: "padding",
        label: "Padding",
        component: Padding,
      },
      {
        name: "margin",
        label: "Margin",
        component: Padding,
      },
      jsonForm,
    ],
  },
}

const CONTENT_BLOCKS = {
  h1: HeadingBlock,
  p: ParagraphBlock,
  list: ListBlock,
  actions: ActionsBlock,
  image: ImageBlock,
  video: VideoBlock,
}
