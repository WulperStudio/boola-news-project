import React from "react"
import { getSessionData } from "../../../../utils/middleware"
import { LandingsEdit } from "../../../../components/Landings"

const Landings = props => {
  return <LandingsEdit {...props} />
}

export const getServerSideProps = getSessionData

export default Landings
