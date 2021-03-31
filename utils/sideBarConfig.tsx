import Router from "next/router"
import Lightning from "@wulpers-ui/core/components/icons/Lightning"
import User from "@wulpers-ui/core/components/icons/User"
import Talking from "@wulpers-ui/core/components/icons/Talking"
import Muscles from "@wulpers-ui/core/components/icons/Muscles"
import Logout from "@wulpers-ui/core/components/icons/Logout"
import Headset from "@wulpers-ui/core/components/icons/Headset"
import Config from "@wulpers-ui/core/components/icons/Config"
import { setLogout } from "./middleware"

const sideBarConfig = (page: string) => [
  {
    title: "Campaigns",
    active: page === "/admin/campaigns/table-view" || page === "/admin/campaigns/cards-view",
    icon: <Lightning />,
    type: "primary",
    onClick: function() {
      Router.push("/admin/campaigns/table-view")
    }
  },

  {
    title: "Landings",
    active: page === "/admin/landings/table-view" || page === "/admin/landings/cards-view",
    icon: <Lightning />,
    type: "primary",
    onClick: function() {
      Router.push("/admin/landings/cards-view")
    }
  },
  {
    title: "Contacts",
    active: page === "/admin/contacts/table-view" || page === "/admin/campaigns/cards-view",
    icon: <User />,
    type: "primary",
    onClick: function() {
      Router.push("/admin/contacts/table-view")
    }
  },
  {
    title: "Media",
    active: page === "/admin/media/table-view" || page === "/admin/media/cards-view",
    icon: <Talking />,
    type: "primary",
    onClick: function() {
      Router.push("/admin/media/table-view")
    }
  },
  {
    title: "Helpers",
    active: page === "/admin/helpers/table-view" || page === "/admin/helpers/cards-view",
    icon: <Muscles />,
    type: "primary",
    onClick: function() {
      Router.push("/admin/helpers/table-view")
    }
  },
  {
    title: "Logout",
    active: page === "/Logout",
    icon: <Logout />,
    type: "secondary",
    onClick: async function() {
      return await setLogout("/admin/login")
    }
  }
]

export default sideBarConfig
