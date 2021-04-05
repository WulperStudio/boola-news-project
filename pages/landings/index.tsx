import React from "react"
import axios from "axios"
import { LandingsPublic } from "../../components/Landings"

const Landings = props => {
  return <LandingsPublic {...props} />
}

export const getServerSideProps = async ({ req }: any) => {
  const getLandings = await axios.get(
    `${process.env.strapiServer}/pages?path=/&domain=${req.headers.host}`
  )

  if (getLandings.status === 200 && getLandings.data.length) {
    return { props: { data: getLandings.data[0], error: false } }
  } else {
    return { props: { data: {}, error: true } }
  }
}

export default Landings
