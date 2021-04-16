import React from "react"
import { TinaProvider, TinaCMS } from "tinacms"
import { MediaStore } from "./MediaStore"
import Editor from "./Editor"

export const Provider = ({ initialValues, token, edit, mobile }) => {
  const cms = new TinaCMS({
    enabled: true,
    sidebar: {
      buttons: {
        save: "Apply",
        reset: null,
      },
    },
    toolbar: false,
    //@ts-ignore
    media: new MediaStore(),
  })

  cms.plugins.remove({
    __type: "screen",
    name: "Media Manager",
  })

  import("react-tinacms-editor").then(
    ({ MarkdownFieldPlugin, HtmlFieldPlugin }) => {
      cms.plugins.add(MarkdownFieldPlugin)
      cms.plugins.add(HtmlFieldPlugin)
    }
  )

  return (
    <TinaProvider cms={cms}>
      <div
        style={
          mobile
            ? {
                width: 414,
                height: 736,
                marginLeft: "auto",
                marginRight: "auto",
                border: "1px solid #ccc",
                overflowY: "auto",
                transition: "width 2s, height 4s",
              }
            : { transition: "width 2s, height 4s" }
        }
      >
        <Editor initialValues={initialValues} token={token} edit={edit} />
      </div>
    </TinaProvider>
  )
}
