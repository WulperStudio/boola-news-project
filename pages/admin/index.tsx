import React from "react"
// @ts-ignore
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
// @ts-ignore
import sideBarConfig from "../../utils/sideBarConfig"
import Router from "next/router"

const AdminDashboard = () => {

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

export default AdminDashboard
