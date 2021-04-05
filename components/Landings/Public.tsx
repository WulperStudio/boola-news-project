import React from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { useAsync } from "react-async-hook"
import { TinaProvider, TinaCMS } from "tinacms"
import TinaEdit from "./Tina"

export const LandingsPublic = ({ data }) => {
  const cms = new TinaCMS({
    enabled: false,
    sidebar: false,
    toolbar: false,
  })

  return (
    <TinaProvider cms={cms}>
      <TinaEdit initialValues={data} edit={false} token="" />
    </TinaProvider>
  )
}
