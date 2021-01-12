import React from "react"
import Router from "next/router"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"

export default function Contacts() {
  return (
    <AdminTheme
      title="**Contacts**"
      buttonBackOnClick={() => Router.push("/admin")}
      loading={false}>
      Contacts
    </AdminTheme>
  )
}