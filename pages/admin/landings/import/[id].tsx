import React from "react"
import { Import } from "../../../../components/Landings/Import"
import { getSessionData } from "../../../../utils/middleware"

const Landings = props => {
  return <Import />
}

export const getServerSideProps = getSessionData

export default Landings
