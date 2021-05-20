import React, { useEffect } from "react"
import useAppContext from "../../../components/ContextProvider"
import Export from "../../../components/Landings/Export"
import Provider from "../../../components/Landings/tina/Provider"
import {
  getSessionData,
  getSessionDataInterface,
} from "../../../utils/middleware"

const ExportView = (props: getSessionDataInterface) => {
  const [, setState] = useAppContext()
  useEffect(() => {
    setState(props)
  }, [props])
  return <Provider><Export /></Provider>
}

export const getServerSideProps = getSessionData

export default ExportView