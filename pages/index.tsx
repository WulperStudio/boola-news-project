import React from "react"
import Router, { useRouter } from "next/router"
import { NextApiRequest } from "next"
import Head from "next/head"
import fetch from "isomorphic-unfetch"
import Blog from "@wulpers-ui/core/components/templates/Blog"
import CardBlog from "@wulpers-ui/core/components/molecules/CardBlog/CardBlog"
import Grid from "@wulpers-ui/core/components/atoms/Grid"
import Comments from "../utils/Comments"

const Home = ({ data }: any) => {
  const router = useRouter()
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
            <CardBlog
              key={data.posts[0].title}
              variant="type2"
              data={{
                title: data.posts[0].title,
                preTitle: "preTitle",
                content: data.posts[0].content,
                image: data.posts[0].image[0]
                  ? process.env.strapiServer + data.posts[0].image[0].url
                  : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png",
              }}
              onClick={() => {
                router.push(`/[slug]`, `/${data.posts[0].slug}`, {
                  shallow: true,
                })
              }}
            />
          </Grid>
        )}

        {data.posts[1] && (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <CardBlog
              key={data.posts[1].title}
              variant="type1"
              data={{
                title: data.posts[1].title,
                preTitle: "preTitle",
                content: data.posts[1].content,
                image: data.posts[1].image[0]
                  ? process.env.strapiServer + data.posts[1].image[0].url
                  : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png",
              }}
              onClick={() => {
                router.push(`/[slug]`, `/${data.posts[1].slug}`, {
                  shallow: true,
                })
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
                image: data.posts[2].image[0]
                  ? process.env.strapiServer + data.posts[2].image[0].url
                  : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png",
              }}
              onClick={() => {
                router.push(`/[slug]`, `/${data.posts[2].slug}`, {
                  shallow: true,
                })
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
                image: data.posts[3].image[0]
                  ? process.env.strapiServer + data.posts[3].image[0].url
                  : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png",
              }}
              onClick={() => {
                router.push(`/[slug]`, `/${data.posts[3].slug}`, {
                  shallow: true,
                })
              }}
            />
          </Grid>
        )}

        {data.posts[4] && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={8}>
              <CardBlog
                key={data.posts[4].title}
                variant="type2"
                data={{
                  title: data.posts[4].title,
                  preTitle: "preTitle",
                  content: data.posts[4].content,
                  image: data.posts[4].image[0]
                    ? process.env.strapiServer + data.posts[4].image[0].url
                    : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png",
                }}
                onClick={() => {
                  router.push(`/[slug]`, `/${data.posts[4].slug}`, {
                    shallow: true,
                  })
                }}
              />
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
              <CardBlog
                key={data.posts[5].title}
                variant="type1"
                data={{
                  title: data.posts[5].title,
                  preTitle: "preTitle",
                  content: data.posts[5].content,
                  image: data.posts[5].image[0]
                    ? process.env.strapiServer + data.posts[5].image[0].url
                    : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png",
                }}
                onClick={() => {
                  router.push(`/[slug]`, `/${data.posts[5].slug}`, {
                    shallow: true,
                  })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              {data.posts[6] && (
                <Grid item xs={12} sm={6} md={6} lg={12}>
                  <CardBlog
                    key={data.posts[6].title}
                    variant="type2"
                    data={{
                      title: data.posts[6].title,
                      preTitle: "preTitle",
                      content: data.posts[6].content,
                      image: data.posts[6].image[0]
                        ? process.env.strapiServer + data.posts[6].image[0].url
                        : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png",
                    }}
                    onClick={() => {
                      router.push(`/[slug]`, `/${data.posts[6].slug}`, {
                        shallow: true,
                      })
                    }}
                  />
                </Grid>
              )}
              {data.posts[7] && (
                <Grid item xs={12} sm={6} md={6} lg={12}>
                  <CardBlog
                    key={data.posts[7].title}
                    variant="type2"
                    data={{
                      title: data.posts[7].title,
                      preTitle: "preTitle",
                      content: data.posts[7].content,
                      image: data.posts[7].image[0]
                        ? process.env.strapiServer + data.posts[7].image[0].url
                        : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png",
                    }}
                    onClick={() => {
                      router.push(`/[slug]`, `/${data.posts[7].slug}`, {
                        shallow: true,
                      })
                    }}
                  />
                </Grid>
              )}
              {data.posts[8] && (
                <Grid item xs={12} sm={6} md={6} lg={12}>
                  <CardBlog
                    key={data.posts[8].title}
                    variant="type2"
                    data={{
                      title: data.posts[8].title,
                      preTitle: "preTitle",
                      content: data.posts[8].content,
                      image: data.posts[8].image[0]
                        ? process.env.strapiServer + data.posts[8].image[0].url
                        : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png",
                    }}
                    onClick={() => {
                      router.push(`/[slug]`, `/${data.posts[8].slug}`, {
                        shallow: true,
                      })
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </>
        )}

        {data.posts[9] && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={8}>
              <CardBlog
                key={data.posts[9].title}
                variant="type2"
                data={{
                  title: data.posts[9].title,
                  preTitle: "preTitle",
                  content: data.posts[9].content,
                  image: data.posts[9].image[0]
                    ? process.env.strapiServer + data.posts[9].image[0].url
                    : "https://boola-news-admin.herokuapp.com/uploads/card_image_b9274b39f7.png",
                }}
                onClick={() => {
                  router.push(`/[slug]`, `/${data.posts[9].slug}`, {
                    shallow: true,
                  })
                }}
              />
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
      <Comments />
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
