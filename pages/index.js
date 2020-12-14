import React from 'react'
import Head from "next/head";
import fetch from "isomorphic-unfetch"

import Blog from "@wulpers-ui/core/components/templates/Blog"
import CardBlog from "@wulpers-ui/core/components/molecules/CardBlog/CardBlog"
import {useRouter} from 'next/router'

const Home = ({data}) => {
  const router = useRouter()
  return (
    <Blog>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content="Free Web tutorials"/>
      </Head>
      <br/>
      {data.posts && data.posts.map((post) =>
        <CardBlog
          key={post.title}
          variant='type2'
          data={{
            title: post.title,
            preTitle: "preTitle",
            content: post.content,
            image: process.env.strapiServer + post.image[0].url
          }}
          onClick={() => {
            router.push(`/[slug]`, `/${post.slug}`, {shallow: true})
          }}
        />
      )}
    </Blog>
  )
}

export const getServerSideProps = async ({req}) => {
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
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({query: queryGrpahQL})
  });
  const {data} = await response.json()
  return {props: {data: data.blogs[0]}}
}

export default Home
