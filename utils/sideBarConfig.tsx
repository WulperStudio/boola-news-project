import Router from "next/router"
import Lightning from "@wulpers-ui/core/components/icons/Lightning"
import User from "@wulpers-ui/core/components/icons/User"
import Talking from "@wulpers-ui/core/components/icons/Talking"
import Muscles from "@wulpers-ui/core/components/icons/Muscles"
import Headset from "@wulpers-ui/core/components/icons/Headset"
import Config from "@wulpers-ui/core/components/icons/Config"
import { setLogout } from "./middleware"

const sideBarConfig = (page: string) => [
  {
    title: "Campaigns",
    active: page === "/campaigns/table-view" || page === "/campaigns/cards-view",
    icon: <Lightning />,
    type: "primary",
    onClick: function() {
      Router.push("/admin/campaigns/table-view")
    }
  },
  {
    title: "Logout",
    active: page === "/Logout",
    icon: "X",
    type: "secondary",
    onClick: async function() {
      return await setLogout("/admin/login")
    }
  }
]

export default sideBarConfig
