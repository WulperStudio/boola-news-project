import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Blog from "@wulpers-ui/core/components/templates/Blog"
import CardBlog from "@wulpers-ui/core/components/molecules/CardBlog"
import { getSessionData } from "../../../../utils/middleware"
import Comments from "@wulpers-ui/core/components/organisms/Comments/Comments"
import {
  getCommentsbyDomain,
  createComment,
  createMessage,
  getPostById,
} from "../../../../queries"

export default function Preview({ domain, dataSession, token }: any) {
  const route = useRouter()
  const [data, setData] = useState(null)
  const [comments, setComments] = useState(null)

  useEffect(() => {
    getCommentsbyDomain(window.location.href, token)
      .then(data => {
        console.log("data", data)
        setComments(data)
      })
      .catch(error => {
        setComments([])
        console.log("An error occurred:", error.response)
      })

    getPostById(route.query.id)
      .then(post => {
        console.log("post>>>", post)
        setData(post)
      })
      .catch(error => {
        console.log("An error occurred:", error.response)
      })
  }, [])

  const onChangeComments = (type, data) => {
    console.log("newMessage", type, data)
    if (type === "newComments") {
      return createComment(data, token)
        .then(({ data }) => {
          return data.id
        })
        .catch(error => {
          return false
        })
    } else if (type === "newMessage") {
      createMessage(data, token)
        .then(({ data }) => {
          return true
        })
        .catch(error => {
          return false
        })
    }
    return false
  }

  if (data) {
    return (
      <>
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
        </Blog>
        {comments && (
          <Comments
            initialValues={comments}
            userName={dataSession.fullName}
            onChange={onChangeComments}
          />
        )}
      </>
    )
  } else {
    return <></>
  }
}

export const getServerSideProps = getSessionData
