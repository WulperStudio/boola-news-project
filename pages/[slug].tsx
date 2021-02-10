import React from "react"
import { useRouter } from "next/router"
import fetch from "isomorphic-unfetch"
import Error from "next/error"
import Blog from "@wulpers-ui/core/components/templates/Blog"
import ParseHTML from "@wulpers-ui/core/components/atoms/ParseHTML"
import Player from "@wulpers-ui/core/components/atoms/Player"
import TimeAgo from "@wulpers-ui/core/components/atoms/TimeAgo"
import Chip from "@wulpers-ui/core/components/atoms/Chip"
// @ts-ignore
import Comments from "../utils/Comments"


const Slug = (props: any) => {
  const router = useRouter()
  const post = props.data.posts[0]
  if (post) {
    return <Blog>
    <br />
    <div
      style={{
        width: "100%",
        maxWidth: 713,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Chip size="large" label="MEDIA" />
      <Chip size="large" label="Exclusive" />
      <div style={{ float:"right"}}><TimeAgo date={1611367941038} /></div>
      <h1>{post.title}</h1>
      <img src={process.env.strapiServer + post.image[0].url} />
      <ParseHTML html={post.content} />
      {post.customForm.data &&
        post.customForm.data.map((form: any, i) => {
          switch (form.type) {
            case "subtitle":
              return <h2 key={i}>{form.value}</h2>
            case "image":
              return (
                <img
                  key={i}
                  width="100%"
                  src={process.env.strapiServer + form.value[0].url}
                />
              )
            case "phrase":
              return <ParseHTML key={i} html={form.value} />
            case "video":
              return <Player key={i} url={form.value} />
          }
        })}
    </div>
    <Comments />
  </Blog>

  } else {
    // @ts-ignore
    return <Error statusCode={404} />
  }
}

export const getServerSideProps = async ({ req, query }: any) => {
  const queryGraphQL = `query {
      blogs(where: { domain: "${req.headers.host}" }) {
        title
        description
        posts(where: { slug: "${query.slug}" }) {
          title
          content
          image{
            url
          }
          customForm
        }
      }
    }`
  const response = await fetch(`${process.env.strapiServer}/graphql`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ query: queryGraphQL })
  })
  const { data } = await response.json()
  return { props: { data: data.blogs[0] } }
}

export default Slug
