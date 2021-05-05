import React from "react"
import { Import } from "../../../../components/Landings/Import"
import { getSessionData } from "../../../../utils/middleware"

const Landings = (props: { token: string; domain: string; dataSession: any }) => {
  return <Import {...props} />
}

export const getServerSideProps = getSessionData

export default Landings
