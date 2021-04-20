import React from "react"
import { BlocksControls, InlineBlocks } from "react-tinacms-inline"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { jsonParse, jsonForm } from "../utils"
import { HeadingBlock } from "./Heading"
import { ParagraphBlock } from "./Paragraph"
import { ActionsBlock } from "./Actions"
import { ImageBlock } from "./Image"
import { ListBlock } from "./List"

function Content({ index, data }) {
  const { width } = data
  return (
    <Grid item xs={width} id="GRID">
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
    ],
  },
}

const CONTENT_BLOCKS = {
  h1: HeadingBlock,
  p: ParagraphBlock,
  list: ListBlock,
  actions: ActionsBlock,
  image: ImageBlock,
}
