import React from "react"
import Router, { useRouter } from "next/router"
import { NextApiRequest } from "next"
import Head from "next/head"
import fetch from "isomorphic-unfetch"
import Blog from "@wulpers-ui/core/components/templates/Blog"
import CardBlog from "@wulpers-ui/core/components/molecules/CardBlog/CardBlog"
import Grid from "@wulpers-ui/core/components/atoms/Grid"
//import Comments from "../utils/Comments"

const Home = ({ data }: any) => {
  const router = useRouter()

  const Card = ({ dataCard }: any) => (
    <CardBlog
      key={dataCard.title}
      variant="type2"
      data={{
        title: dataCard.title,
        preTitle: "preTitle",
        content: dataCard.content,
        image: dataCard.image[0]
          ? process.env.strapiServer + dataCard.image[0].url
          : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png",
      }}
      onClick={() => {
        router.push(`/[slug]`, `/${dataCard.slug}`, {
          shallow: true,
        })
      }}
    />
  )

  return (
    <Blog
      nameBlog="BoolaNews"
      logo="https://boola-news-admin.herokuapp.com/uploads/Group_715_9d0f8b67ac.png"
      navBarConfig={[
        {
          type: "Submenu",
          items: [
            { title: "Business", onClick: () => alert("Business") },
            { title: "AgTech", onClick: () => alert("AgTech") },
            { title: "FinTech", onClick: () => alert("FinTech") },
            { title: "AdTech", onClick: () => alert("AdTech") },
          ],
        },
        {
          type: "separation",
        },
        {
          type: "Button",
          title: "Favourites",
          onClick: () => {
            Router.push("/favourites")
          },
          style: "primary-outlined",
        },
      ]}
      navBarLinks={[
        {
          text: "Business",
          link: "#",
          onClick: () => alert("hola"),
        },
        {
          text: "AgTech",
          link: "#",
          onClick: () => alert("hola"),
        },
        {
          text: "FinTech",
          link: "#",
          onClick: () => alert("hola"),
        },
        {
          text: "AdTech",
          link: "#",
          onClick: () => alert("hola"),
        },
        {
          text: "Cripto",
          link: "#",
          onClick: () => alert("hola"),
        },
        {
          text: "Industry",
          link: "#",
          onClick: () => alert("hola"),
        },
        {
          text: "Industry 4.0",
          link: "#",
          onClick: () => alert("hola"),
        },
      ]}
    >
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
      </Head>

      <br />
      <Grid container spacing={3}>
        {data.posts[0] && (
          <Grid item xs={12} sm={6} md={4} lg={12}>
            <Card dataCard={data.posts[0]} />
          </Grid>
        )}

        {data.posts[1] && (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card dataCard={data.posts[1]} />
          </Grid>
        )}

        {data.posts[2] && (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card dataCard={data.posts[2]} />
          </Grid>
        )}

        {data.posts[3] && (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card dataCard={data.posts[3]} />
          </Grid>
        )}

        {data.posts[4] && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={8}>
              <Card dataCard={data.posts[4]} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <div
                style={{ background: "#FAFAFA", padding: 16, height: "100%" }}
              >
                Subscribers
              </div>
            </Grid>
          </>
        )}

        {data.posts[5] && (
          <>
            <Grid item xs={12} sm={6} md={4} lg={8}>
              <Card dataCard={data.posts[5]} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              {data.posts[6] && (
                <Grid item xs={12} sm={6} md={6} lg={12}>
                  <Card dataCard={data.posts[6]} />
                </Grid>
              )}
              {data.posts[7] && (
                <Grid item xs={12} sm={6} md={6} lg={12}>
                  <Card dataCard={data.posts[7]} />
                </Grid>
              )}
              {data.posts[8] && (
                <Grid item xs={12} sm={6} md={6} lg={12}>
                  <Card dataCard={data.posts[8]} />
                </Grid>
              )}
            </Grid>
          </>
        )}

        {data.posts[9] && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={8}>
              <Card dataCard={data.posts[9]} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <div
                style={{ background: "#FAFAFA", padding: 16, height: "100%" }}
              >
                Subscribers
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </Blog>
  )
}

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const queryGrpahQL = `query {
    blogs(where: { domain: "${req.headers.host}" }) {
      title
      description
      posts(where: { status: "Publish" }, limit:10) {
        title
        slug
        content
        status
        image{
          url
        }
      }
    }
  }`
  const response = await fetch(`${process.env.strapiServer}/graphql`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ query: queryGrpahQL }),
  })
  const { data } = await response.json()
  return { props: { data: data.blogs[0] } }
}

export default Home
