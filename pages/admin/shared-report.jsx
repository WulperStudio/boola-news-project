import React from "react"
import Link from "next/link"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import Router from "next/router"

const SharedReport = () => {

  return (
    <AdminTheme title="**Shared Report**" buttonBackOnClick={() => Router.push("/admin")} >
      Shared Report
    </AdminTheme>
  )
}

export default SharedReport
