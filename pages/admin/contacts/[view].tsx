import React from "react"
import Router from "next/router"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import Comments from "../../../utils/Comments"
import { getSessionData } from "../../../utils/middleware"

export default function Contacts({token, dataSession}) {
  return (
    <AdminTheme
      title="**Contacts**"
      buttonBackOnClick={() => Router.push("/admin")}
      loading={false}>
      Contacts
      <Comments token={token} dataSession={dataSession} />
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData