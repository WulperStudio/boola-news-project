import React from "react"
import Router, {useRouter} from "next/router"
// @ts-ignore
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
// @ts-ignore
import sideBarConfig from "../../utils/sideBarConfig"
import { getSessionData } from "../../utils/middleware"


const AdminDashboard = () => {
  const router = useRouter()
  console.log("Router>>>", router)
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
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData

export default AdminDashboard
