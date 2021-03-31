import React from "react"
import Router, { useRouter } from "next/router"
import axios from "axios"
import { useAsync } from "react-async-hook"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import Plus from "@wulpers-ui/core/components/icons/Plus"

import LandingsCards from "./Cards"

const fetchLandings = (domain: string, token: string) =>
  axios.get(`${process.env.strapiServer}/pages?domain=${domain}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const navBarConfig = [
  {
    title: "Fav",
    icon: <Plus />,
    onClick: function () {
      Router.push("/admin/campaigns/create")
    },
    type: "Fav",
  },
]

export const LandingsList = ({ token, domain, dataSession }) => {
  const { result, error, loading } = useAsync(fetchLandings, [domain, token])
  return (
    <AdminTheme
      title="**Landings**"
      buttonBackOnClick={() => Router.push("/admin")}
      navBarConfig={navBarConfig}
      loading={loading}
    >
      <LandingsCards
        data={result && !loading && !error ? result.data : []}
        loading={loading}
        error={error}
      />
    </AdminTheme>
  )
}

