import React from "react"
import { getSessionData } from "../../../utils/middleware"
import { LandingsList } from "../../../components/Landings"

const Landings = props => {
  return <LandingsList {...props} />
}

export const getServerSideProps = getSessionData

export default Landings
