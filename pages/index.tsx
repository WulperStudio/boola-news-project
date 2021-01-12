import React from "react"
import { useRouter } from "next/router"
import { NextApiRequest } from "next"
import Head from "next/head"
import fetch from "isomorphic-unfetch"
import Blog from "@wulpers-ui/core/components/templates/Blog"
import CardBlog from "@wulpers-ui/core/components/molecules/CardBlog/CardBlog"
import Grid from "@wulpers-ui/core/components/atoms/Grid"

const Home = ({ data }: any) => {
  const router = useRouter()
  return (
    <Blog>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
      </Head>

      <br />

      {data.posts[0] && (
        <>
          <CardBlog
            key={data.posts[0].title}
            variant="type2"
            data={{
              title: data.posts[0].title,
              preTitle: "preTitle",
              content: data.posts[0].content,
              image: data.posts[0].image[0] ? process.env.strapiServer + data.posts[0].image[0].url : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png"
            }}
            onClick={() => {
              router.push(`/[slug]`, `/${data.posts[0].slug}`, { shallow: true })
            }}
          />
          <br />
        </>
      )}
      <Grid container spacing={3}>
        {data.posts[1] && (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <CardBlog
              key={data.posts[1].title}
              variant="type1"
              data={{
                title: data.posts[1].title,
                preTitle: "preTitle",
                content: data.posts[1].content,
                image: data.posts[1].image[0] ? process.env.strapiServer + data.posts[1].image[0].url : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png"
              }}
              onClick={() => {
                router.push(`/[slug]`, `/${data.posts[1].slug}`, { shallow: true })
              }}
            />
          </Grid>
        )}

        {data.posts[2] && (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <CardBlog
              key={data.posts[2].title}
              variant="type1"
              data={{
                title: data.posts[2].title,
                preTitle: "preTitle",
                content: data.posts[2].content,
                image: data.posts[2].image[0] ? process.env.strapiServer + data.posts[2].image[0].url : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png"
              }}
              onClick={() => {
                router.push(`/[slug]`, `/${data.posts[2].slug}`, { shallow: true })
              }}
            />
          </Grid>
        )}

        {data.posts[3] && (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <CardBlog
              key={data.posts[3].title}
              variant="type1"
              data={{
                title: data.posts[3].title,
                preTitle: "preTitle",
                content: data.posts[3].content,
                image: data.posts[3].image[0] ? process.env.strapiServer + data.posts[3].image[0].url : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png"
              }}
              onClick={() => {
                router.push(`/[slug]`, `/${data.posts[3].slug}`, { shallow: true })
              }}
            />
          </Grid>
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
      posts(limit:10) {
        title
        slug
        content
        image{
          url
        }
      }
    }
  }`
  const response = await fetch(`${process.env.strapiServer}/graphql`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ query: queryGrpahQL })
  })
  const { data } = await response.json()
  return { props: { data: data.blogs[0] } }
}

export default Home
