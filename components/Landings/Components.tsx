import React from "react"
import axios from "axios"
import Router from "next/router"
import GridContainer from "@wulpers-ui/core/components/containers/Grid"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardActions from "@material-ui/core/CardActions"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"

const Components = ({ id, token, data, loading, error }) => {
  const addComponentsPage = (component: any) =>
    axios
      .get(`${process.env.strapiServer}/pages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        let body = data.page_latest.data
        body.blocks.push(component)
        return axios.put(
          `${process.env.strapiServer}/pages-histories/${data.page_latest.id}`,
          { data: body },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      })

  if (loading) {
    return <div />
  } else if (error) {
    return <div>Error Page</div>
  } else {
    return (
      <GridContainer>
        {data.map(({ title, code, screenshot, updatedAt }: any) => {
          return (
            <Card>
              <CardHeader
                avatar={<Avatar alt={title} src="/avatar.jpg"/>}
                title={title}
                subheader={updatedAt}
              />
              <CardMedia
                style={{
                  height: 150,
                }}
                image={`${process.env.strapiServer}${screenshot?screenshot.url:''}`}
                title={title}
              />
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    addComponentsPage(code).then(() => {
                      Router.push(`/admin/landings/edit/${id}`)
                    })
                  }}
                >
                  Import
                </Button>
              </CardActions>
            </Card>
          )
        })}
      </GridContainer>
    )
  }
}

export default Components
