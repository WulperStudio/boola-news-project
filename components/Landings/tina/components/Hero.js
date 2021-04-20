import React from "react"
import { BlocksControls, InlineBlocks, InlineGroup } from "react-tinacms-inline"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import { ContentBlock } from "./Content"
import { jsonForm } from "../utils"
import { Navbar, NavbarDefaultItem, NavbarFields } from "./Navbar"

const useStyles = makeStyles({
  fixStyle: {
    "& div": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignContent: "space-around",
      justifyContent: "center",
      alignItems: "center",
    },
  },
})
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
    withNavbar,
    navbar,
  } = data
  const classes = useStyles()
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div
        className="hero"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: height,
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
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight,
        }}
      >
        {withNavbar && (
          <Container>
            <InlineGroup
              name="navbar"
              focusRing={{ offset: 0 }}
              insetControls={true}
              fields={NavbarFields}
            >
              <Navbar data={navbar} />
            </InlineGroup>
          </Container>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Container id="CONTAINER">
            <Grid
              id="GRIDCONTAINER"
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                id="GRID12"
                justify="center"
                alignItems="center"
                className={classes.fixStyle}
              >
                <InlineBlocks
                  className="TEST"
                  focusRing={{ offset: 0 }}
                  name="content"
                  blocks={CONTENT_BLOCKS}
                  direction="horizontal"
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </BlocksControls>
  )
}
const DefaultItemHero = {
  "paddingTop": 16,
  "align": "center",
  "height": 400,
  "background_image": "",
  "paddingRight": 0,
  "navbar": {
    "logo": "https://fakeimg.pl/190x56/?text=Logo%20%20190%20x%2056",
    "items": [
      {
        "label": "Link Example",
        "href": "/",
        "type": "Link"
      },
      {
        "label": "Button Example",
        "href": "/",
        "type": "Button"
      }
    ],
    "styles": "{}"
  },
  "text_color": "#fffaf4",
  "background_color": "#051e26",
  "withNavbar": false,
  "paddingLeft": 0,
  "content": [
    {
      "_template": "content",
      "width": 6,
      "content": [
        {
          "_template": "h1",
          "headline": "Lorem Ipsum",
          "text_color": "#ffffff",
          "text_align": "center",
          "font_size": "32px",
          "styles": "{}",
          "transitions": "None"
        },
        {
          "_template": "p",
          "subtext": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          "text_color": "#ffffff",
          "text_align": "center",
          "font_size": "16px",
          "styles": "{}"
        },
        {
          "_template": "actions",
          "text_align": "center",
          "actions": [
            {
              "label": "Action Label",
              "link": "/",
              "type": "button",
              "color": "primary",
              "size": "medium"
            }
          ]
        }
      ]
    },
    {
      "_template": "content",
      "width": 6,
      "content": [
        {
          "_template": "image",
          "scr": "https://fakeimg.pl/400x300/?retina=1&text=Upload%20Image",
          "alt": "Image",
          "width": 400,
          "height": 300,
          "align": "center",
          "styles": "{}"
        }
      ]
    }
  ],
  "_template": "hero",
  "paddingBottom": 16
}

export const heroBlock = {
  Component: Hero,
  template: {
    label: "Hero",
    defaultItem: DefaultItemHero,
    fields: [
      {
        name: "withNavbar",
        component: "toggle",
        label: "With Navbar?",
        toggleLabels: {
          true: "Yes",
          false: "No",
        },
      },
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
  content: ContentBlock,
}
