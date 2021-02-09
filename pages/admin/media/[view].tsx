import React from "react"
import Router from "next/router"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import { getSessionData } from "../../../utils/middleware"
import Comments from "../../../utils/Comments"

export default function Contacts({token, dataSession}) {
  return (
    <AdminTheme
      title="**Spread your content**"
      buttonBackOnClick={() => Router.push("/admin")}
      loading={false}>
      Media
      <Comments token={token} dataSession={dataSession} />
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData