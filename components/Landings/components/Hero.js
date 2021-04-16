import React from "react"
import { BlocksControls, InlineBlocks } from "react-tinacms-inline"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { HeadingBlock } from "./Heading"
import { ParagraphBlock } from "./Paragraph"
import { ActionsBlock } from "./Actions"
import { ImageBlock } from "./Image"
import { ListBlock } from "./List"
import { jsonForm } from "../utils"

const BACKGROUND_IMAGE_NONE =
  "https://fakeimg.pl/420x100/?retina=1&text=Upload%20File"
const STRAPI_URL = "https://boola-news-admin.herokuapp.com"

export function Hero({ index, data }) {
  const {
    text_color,
    background_color,
    align,
    background_image,
    height,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  } = data
  console.log(background_color)
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div
        className="hero"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          color: text_color || "#000",
          backgroundColor: background_color || "transparent",
          backgroundImage:
            background_image.src === BACKGROUND_IMAGE_NONE
              ? "none"
              : `url(${background_image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition:
            align === "right" ? "left" : align === "left" ? "right" : "center",
          backgroundSize: align === "center" ? "cover" : "contain",
          height,
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight,
        }}
      >
        <Container>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {align === "right" && <Grid item xs={6} />}
            <Grid item xs={12}>
              <InlineBlocks
                name="content"
                blocks={CONTENT_BLOCKS}
                direction="vertical"
              />
            </Grid>
            {align === "left" && <Grid item xs={6} />}
          </Grid>
        </Container>
      </div>
    </BlocksControls>
  )
}

export const heroBlock = {
  Component: Hero,
  template: {
    label: "Hero",
    defaultItem: {
      background_color: "#051e26",
      text_color: "#fffaf4",
      align: "center",
      background_image: "",
      paddingTop: 0,
      height: 400,
      paddingBottom: 32,
      paddingLeft: 32,
      paddingRight: 0,
    },
    fields: [
      {
        name: "background_color",
        label: "Background Color",
        component: "color",
        widget: "block",
        colors: ["#051e26", "#f2dfc6", "#cfdcc8", "#ebbbbb", "#8a1414"],
      },
      {
        name: "background_image",
        label: "Background Image",
        component: "image",
        parse: media =>
          media.filename ? `${STRAPI_URL}/uploads/${media.filename}` : "",
        uploadDir: () => "/",
        previewSrc: src => src,
        focusRing: false,
        clearable: true,
      },
      {
        name: "text_color",
        label: "Text Color",
        component: "select",
        options: ["white", "black"],
      },
      {
        name: "align",
        label: "Alignment",
        component: "select",
        options: ["center", "left", "right"],
      },
      {
        name: "height",
        label: "Height",
        component: "number",
        defaultValue: 400,
      },
      {
        name: "paddingTop",
        label: "padding Top",
        component: "number",
        defaultValue: 32,
      },
      {
        name: "paddingBottom",
        label: "padding Bottom",
        component: "number",
        defaultValue: 32,
      },
      {
        name: "paddingLeft",
        label: "padding Left",
        component: "number",
        defaultValue: 0,
      },
      {
        name: "paddingRight",
        label: "padding Right",
        component: "number",
        defaultValue: 0,
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
}
