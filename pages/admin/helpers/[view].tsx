import React from "react"
import Router from "next/router"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import { getSessionData } from "../../../utils/middleware"
import Comments from "../../../utils/Comments"

export default function Contacts({token, dataSession}) {
  return (
    <AdminTheme
      title="**Helpers**"
      buttonBackOnClick={() => Router.push("/admin")}
      loading={false}>
      Helpers
      <Comments token={token} dataSession={dataSession} />
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData