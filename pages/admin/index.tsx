import React from "react"
import Router, {useRouter} from "next/router"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import sideBarConfig from "../../utils/sideBarConfig"
import { getSessionData } from "../../utils/middleware"
import Comments from "../../utils/Comments"

const AdminDashboard = ({token, dataSession}) => {
  const router = useRouter()
  return (
    <AdminTheme
      title="Analyzing path of *_import & validation_* "
      sideBarConfig={sideBarConfig("/admin")}
      navBarConfig={[
        {
          title: "Shared Report",
          onClick: function() {
            Router.push("/admin/shared-report")
          },
          type: "Button"
        }]}>
      Index Admin
      <Comments token={token} dataSession={dataSession} />
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData

export default AdminDashboard
