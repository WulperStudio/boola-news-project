import React, { useEffect } from "react"
import {
  getSessionData,
  getSessionDataInterface,
} from "../../../../utils/middleware"
import { LandingsEdit } from "../../../../components/Landings"
import Provider from "../../../../components/Landings/tina/Provider"
import useAppContext from "../../../../components/ContextProvider"

const Landings = (props: getSessionDataInterface) => {
  const [, setState] = useAppContext()
  useEffect(() => {
    setState(props)
  }, [props])
  return (
    <Provider>
      <LandingsEdit {...props} />
    </Provider>
  )
}

export const getServerSideProps = getSessionData

export default Landings
