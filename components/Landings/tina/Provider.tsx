import React from "react"
import { TinaProvider, TinaCMS } from "tinacms"
import { MediaStore } from "./MediaStore"

export default function Provider({ children }) {
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

  return <TinaProvider cms={cms}>{children}</TinaProvider>
}
