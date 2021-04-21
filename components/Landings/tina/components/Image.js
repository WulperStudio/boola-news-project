import React from "react"
import { BlocksControls } from "react-tinacms-inline"
import { jsonForm, jsonParse } from "../utils"

function Image({ index, data }) {
  const { scr, width, height, styles, alt, align } = data
  const stylesParse = jsonParse(styles)

  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      className="MuiGrid-grid-xs-12"
      insetControls
    >
      <div
        style={{
          display: "flex",
          ...(align === "center" && {
            justifyContent: "center",
          }),
          ...(align === "right" && {
            justifyContent: "flex-end",
          }),
          ...(align === "left" && {
            justifyContent: "flex-start",
          }),
        }}
      >
        <img
          src={scr}
          width={width}
          height={height}
          alt={alt}
          style={stylesParse}
        />
      </div>
    </BlocksControls>
  )
}

export const ImageBlock = {
  Component: Image,
  template: {
    label: "Image",
    defaultItem: {
      _template: "image",
      scr: "https://fakeimg.pl/400x300/?retina=1&text=Upload%20Image",
      alt: "Image",
      width: 400,
      height: 300,
      align: "center",
      styles: "{}",
    },
    fields: [
      {
        name: "scr",
        label: "Image",
        component: "image",
        parse: media =>
          media.filename
            ? `${process.env.strapiServer}/uploads/${media.filename}`
            : "https://fakeimg.pl/400x300/?retina=1&text=Upload%20Image",
        uploadDir: () => "/",
        previewSrc: src => src,
        focusRing: false,
        clearable: true,
      },
      {
        name: "alt",
        label: "Text Alt SEO",
        component: "text",
        defaultValue: "Image",
      },
      {
        name: "width",
        label: "Width",
        component: "number",
        defaultValue: "400",
      },
      {
        name: "height",
        label: "Height",
        component: "number",
        defaultValue: "300",
      },
      {
        name: "align",
        label: "Alignment",
        component: "select",
        options: ["center", "left", "right"],
        defaultValue: "center",
      },
      jsonForm,
    ],
  },
}
