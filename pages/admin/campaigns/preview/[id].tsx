import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Blog from "@wulpers-ui/core/components/templates/Blog"
import ParseHTML from "@wulpers-ui/core/components/atoms/ParseHTML"
import Player from "@wulpers-ui/core/components/atoms/Player"
import TimeAgo from "@wulpers-ui/core/components/atoms/TimeAgo"
import Chip from "@wulpers-ui/core/components/atoms/Chip"
import { getSessionData } from "../../../../utils/middleware"
import { getPostById } from "../../../../queries"
import Comments from "../../../../utils/Comments"

export default function Preview({ dataSession, token }: any) {
  const route = useRouter()
  const [data, setData] = useState(null)

  useEffect(() => {
    getPostById(route.query.id, token)
      .then(post => {
        console.log(">>>", post.data)
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
            <h1>{data.title}</h1>
            <img src={process.env.strapiServer + data.image[0].url} />
            <ParseHTML html={data.content} />
            {data.customForm.data &&
              data.customForm.data.map((form: any, i) => {
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
          <Comments token={token} dataSession={dataSession} />
        </Blog>
      )}
    </>
  )
}

export const getServerSideProps = getSessionData
