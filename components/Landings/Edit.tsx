import React, { useEffect, useState } from "react"
import Router, { useRouter } from "next/router"
import axios, { AxiosResponse } from "axios"
import { useAsync } from "react-async-hook"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import EyeIcon from "@wulpers-ui/core/components/icons/Eye"
import Publish from "@wulpers-ui/core/components/icons/Publish"
import { TinaProvider, TinaCMS } from "tinacms"
import { MyGitMediaStore } from "./MyMediaStore"
import TinaEdit from "./Tina"
import Snackbar from "@material-ui/core/Snackbar/Snackbar"
import Collapse from "@material-ui/core/Collapse/Collapse"

const fetchLandings = (id: any, token: string) =>
  axios.get(`${process.env.strapiServer}/pages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const publishLanding = (id: any, token: string) =>
  axios
    .get(`${process.env.strapiServer}/pages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response =>
      axios.put(
        `${process.env.strapiServer}/pages/${id}`,
        { data: response.data.page_latest.data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    )

export const LandingsEdit = ({ token }) => {
  const { query } = useRouter()
  const { result, error, loading } = useAsync<AxiosResponse>(fetchLandings, [
    query.id,
    token,
  ])
  const [loadingPage, setloadingPage] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => setloadingPage(loading), [loading])

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }, [showMessage])

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
          title: "Switch",
          onClick: function (view: string) {
            if (view) {
              setMobile(!mobile)
            }
          },
          type: "Switch",
        },
        {
          title: "Fav",
          icon: <EyeIcon />,
          onClick: function () {
            window.open("/landings" + result.data.path, "_blank")
          },
          type: "Fav",
        },
        {
          title: "Fav",
          icon: <Publish />,
          onClick: function () {
            setloadingPage(true)
            publishLanding(query.id, token).then(({ status }) => {
              status === 200 && setShowMessage(true)
              setloadingPage(false)
              setTimeout(() => {
                window.open("/landings" + result.data.path, "_blank")
              }, 2000)
            })
          },
          type: "Fav",
        },
      ]}
      loading={loadingPage}
    >
      <Collapse in={true}>
      <div
        style={
          mobile
            ? {
                width: 375,
                height: 812,
                marginLeft: "auto",
                marginRight: "auto",
                border: "1px solid #ccc",
                overflowY: "auto",
                transition: "width 2s, height 4s"
              }
            : {transition: "width 2s, height 4s"}
        }
      >
        {!loading && !error && (
          <TinaProvider cms={cms}>
            <TinaEdit
              initialValues={
                result && result.data.page_latest ? result.data.page_latest : {}
              }
              token={token}
              edit={true}
            />
          </TinaProvider>
        )}
      </div>
      </Collapse>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showMessage}
        message="Landing successfully publish!!!"
        key={"horizontal"}
      />
    </AdminTheme>
  )
}
