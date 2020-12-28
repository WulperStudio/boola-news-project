import React from "react"
import Link from "next/link"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import Router from "next/router"
import { getSessionData } from "../../utils/middleware"

const Config = () => {

  return (
    <AdminTheme title="**Config**" buttonBackOnClick={() => Router.push("/admin")} >
      Shared Report
    </AdminTheme>
  )
}
export const getServerSideProps = getSessionData

export default Config
