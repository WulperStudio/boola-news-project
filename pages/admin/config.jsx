import React from "react"
import Link from "next/link"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import Router from "next/router"

const Config = () => {

  return (
    <AdminTheme title="**Config**" buttonBackOnClick={() => Router.push("/admin")} >
      Shared Report
    </AdminTheme>
  )
}

export default Config
