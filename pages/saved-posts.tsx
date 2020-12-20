import React from "react"
import Link from "next/link"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import sideBarConfig from "../utils/sideBarConfig"
import Plus from "@wulpers-ui/core/components/icons/Plus"
import Router from "next/router"

const SavedPosts = (props: any) => {

  const navBarConfig = [
    {
      title: "Switch",
      onClick: function(value: string) {
        Router.push("/admin/create-post")
      },
      type: "Switch"
    },
    {
      title: "Fav",
      icon: <Plus />,
      onClick: function() {
       Router.push("/admin")
      },
      type: "Fav"
    },
  ]
  return (
    <AdminTheme title="**Saved Posts**" buttonBackOnClick={() => alert("hola")} navBarConfig={navBarConfig}>
      <div>
        <h1>saved-posts</h1>
        <Link href="/">Home</Link>
      </div>
    </AdminTheme>
  )
}

export default SavedPosts
