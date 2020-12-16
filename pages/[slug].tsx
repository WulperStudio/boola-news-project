import Link from "next/link"
import { useRouter } from "next/router"
import fetch from "isomorphic-unfetch"
// @ts-ignore
import styles from "../styles/Home.module.css"

const Slug = (props: any) => {
  const router = useRouter()
  console.log("query>>>", router.query)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tests</h1>
      <Link href="/">Slug: {router.query.slug}</Link>
    </div>
  )
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
