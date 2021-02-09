import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Blog from "@wulpers-ui/core/components/templates/Blog"
import CardBlog from "@wulpers-ui/core/components/molecules/CardBlog"
import { getSessionData } from "../../../../utils/middleware"
import { getPostById } from "../../../../queries"
import Comments from "../../../../utils/Comments"

export default function Preview({ dataSession, token }: any) {
  const route = useRouter()
  const [data, setData] = useState(null)

  useEffect(() => {
    getPostById(route.query.id, token)
      .then(post => {
        setData(post.data)
      })
      .catch(error => {
        console.error("An error occurred:", error.response)
      })
  }, [])

  return (
    <>
      {data && (
        <Blog>
          <br />
          <CardBlog
            variant="type1"
            data={{
              title: data.title,
              preTitle: "preTitle",
              content: data.content,
              image: data.image.length
                ? process.env.strapiServer + data.image[0].url
                : null,
            }}
          />
          <Comments token={token} dataSession={dataSession} />
        </Blog>
      )}
    </>
  )
}

export const getServerSideProps = getSessionData
