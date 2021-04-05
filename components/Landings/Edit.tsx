import React from "react"
import Router, { useRouter } from "next/router"
import axios, { AxiosResponse } from "axios"
import { useAsync } from "react-async-hook"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import { TinaProvider, TinaCMS } from "tinacms"
import { MyGitMediaStore } from "./MyMediaStore"
import TinaEdit from "./Tina"

const fetchLandings = (id: any, token: string) =>
  axios.get(
    `${process.env.strapiServer}/pages-histories?date=latest&pageId=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

export const LandingsEdit = ({ token }) => {
  const { query } = useRouter()
  const { result, error, loading } = useAsync<AxiosResponse>(fetchLandings, [
    query.id,
    token,
  ])

  const cms = new TinaCMS({
    enabled: true,
    sidebar: {
      buttons: {
        save: "Apply",
        reset: null,
      },
    },
    toolbar: false,
    //@ts-ignore
    media: new MyGitMediaStore(),
  })

  cms.plugins.remove({
    __type: "screen",
    name: "Media Manager",
  })

  import("react-tinacms-editor").then(
    ({ MarkdownFieldPlugin, HtmlFieldPlugin }) => {
      cms.plugins.add(MarkdownFieldPlugin)
      cms.plugins.add(HtmlFieldPlugin)
    }
  )

  return (
    <AdminTheme
      title="**Edit Landings**"
      buttonBackOnClick={() => Router.push("/admin/landings/cards-view")}
      navBarConfig={[
        {
          title: "Fav",
          icon: "P",
          onClick: function () {
            if (loading && !error && result) {
              Router.push("/landings" + result.data[0].path)
            }
          },
          type: "Fav",
        },
      ]}
      loading={loading}
    >
      {!loading && !error && (
        <TinaProvider cms={cms}>
          <TinaEdit
            initialValues={
              result && result.data.length ? result.data[0] : {}
            }
            token={token}
            edit={true}
          />
        </TinaProvider>
      )}
    </AdminTheme>
  )
}
