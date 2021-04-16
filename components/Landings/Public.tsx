import React from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { useAsync } from "react-async-hook"
import { TinaProvider, TinaCMS } from "tinacms"
import Editor from "./tina/Editor"

export const LandingsPublic = ({ data }) => {
  const cms = new TinaCMS({
    enabled: false,
    sidebar: false,
    toolbar: false,
  })

  return (
    <TinaProvider cms={cms}>
      <Editor initialValues={data} edit={false} token="" />
    </TinaProvider>
  )
}
