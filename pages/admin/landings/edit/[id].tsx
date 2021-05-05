import React from "react"
import { getSessionData } from "../../../../utils/middleware"
import { LandingsEdit } from "../../../../components/Landings"
import Provider from "../../../../components/Landings/tina/Provider"

const Landings = props => {
  return (
    <Provider>
      <LandingsEdit {...props} />
    </Provider>
  )
}

export const getServerSideProps = getSessionData

export default Landings
