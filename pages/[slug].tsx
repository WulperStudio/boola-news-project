import { useRouter } from "next/router"
import fetch from "isomorphic-unfetch"
import Error from "next/error"
import Blog from "@wulpers-ui/core/components/templates/Blog"
import CardBlog from "@wulpers-ui/core/components/molecules/CardBlog"
// @ts-ignore
import styles from "../styles/Home.module.css"

const Slug = (props: any) => {
  const router = useRouter()
  const post = props.data.posts[0]
  if (props.data.posts[0]) {
    return <Blog>
      <br />
      <CardBlog variant="type1" data={{
        title: post.title,
        preTitle: "preTitle",
        content: post.content,
        image: post.image.length ? process.env.strapiServer + post.image[0].url : null
      }} />
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
