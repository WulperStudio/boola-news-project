import Router from "next/router"
import Lightning from "@wulpers-ui/core/components/icons/Lightning"
import User from "@wulpers-ui/core/components/icons/User"
import Talking from "@wulpers-ui/core/components/icons/Talking"
import Muscles from "@wulpers-ui/core/components/icons/Muscles"
import Headset from "@wulpers-ui/core/components/icons/Headset"
import Config from "@wulpers-ui/core/components/icons/Config"

const sideBarConfig = (page: string) => [
  {
    title: "Dashboard",
    active: page === "/",
    icon: <Lightning />,
    type: "primary",
    onClick: function() {
      Router.push("/admin")
    }
  },
  {
    title: "Campaigns",
    active: page === "/campaigns/table-view" || page === "/campaigns/cards-view",
    icon: <Talking />,
    type: "primary",
    onClick: function() {
      Router.push("/admin/campaigns/table-view")
    }
  },
  {
    title: "User",
    active: page === "/user",
    icon: <User />,
    type: "primary",
    onClick: function() {
      Router.push("/admin")
    }
  },
  {
    title: "Muscles",
    active: page === "/muscles",
    icon: <Muscles />,
    type: "primary",
    onClick: function() {
      Router.push("/admin")
    }
  },{
    title: "Talking",
    active: page === "/talking",
    icon: <Talking />,
    type: "primary",
    onClick: function() {
      Router.push("/admin")
    }
  },
  {
    title: "Headset",
    active: page === "/headset",
    icon: <Headset />,
    type: "secondary",
    onClick: function() {
      Router.push("/admin")
    }
  },
  {
    title: "Config",
    active: page === "/config",
    icon: <Config />,
    type: "secondary",
    onClick: function() {
      Router.push("/admin/config")
    }
  }
]

export default sideBarConfig
