import React, {useState} from "react"
import Router from "next/router"
import axios from "axios"
import { useAsync } from "react-async-hook"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import Plus from "@wulpers-ui/core/components/icons/Plus"
import Filter from "@wulpers-ui/core/components/icons/Filter"
import Filters from "@wulpers-ui/core/components/molecules/Filters"
import LandingsCards from "./Cards"

const fetchLandings = (domain: string, status: string, token: string) =>
  axios.get(`${process.env.strapiServer}/pages?domain=${domain}&status=${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const navBarConfig = [
  {
    title: "Fav",
    icon: <Plus />,
    onClick: function () {
      Router.push("/admin/landings/create")
    },
    type: "Fav",
  },
  {
    title: "Fav",
    icon: <Filter />,
    type: "Fav",
  },
]

export const LandingsList = ({ token, domain, dataSession }) => {
  const [status, setStatus] = useState("review")
  const { result, error, loading } = useAsync(fetchLandings, [domain, status, token])
  return (
    <AdminTheme
      title="**Landings**"
      buttonBackOnClick={() => Router.push("/admin")}
      navBarConfig={navBarConfig}
      loading={loading}
    >
      <Filters />
      <LandingsCards
        data={result && !loading && !error ? result.data : []}
        loading={loading}
        error={error}
      />
    </AdminTheme>
  )
}
