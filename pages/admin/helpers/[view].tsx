import React from "react"
import Router from "next/router"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"

export default function Contacts() {
  return (
    <AdminTheme
      title="**Helpers**"
      buttonBackOnClick={() => Router.push("/admin")}
      loading={false}>
      Helpers
    </AdminTheme>
  )
}