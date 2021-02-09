import React, { useState, useEffect } from "react"
import {
  createComment,
  createMessage,
  getCommentsbyDomain,
  getPostById,
} from "../queries"
import CommentsComponent from "@wulpers-ui/core/components/organisms/Comments/Comments"

export default function Comments({
  token,
  dataSession,
}: {
  token: string
  dataSession?: any
}) {
  const [comments, setComments] = useState(null)

  useEffect(() => {
    getCommentsbyDomain(window.location.href, token)
      .then(data => {
        setComments(data)
      })
      .catch(error => {
        setComments([])
        console.error("An error occurred:", error.response)
      })
  }, [])

  const onChangeComments = (type, data) => {
    if (type === "newComments") {
      return createComment(data, token)
        .then(({ data }) => {
          return data.id
        })
        .catch(() => {
          return false
        })
    } else if (type === "newMessage") {
      createMessage(data, token)
        .then(() => {
          return true
        })
        .catch(() => {
          return false
        })
    }
    return false
  }

  return (
    <>
      {comments && (
        <CommentsComponent
          initialValues={comments}
          userName={dataSession ? dataSession.fullName : "Anonymous"}
          onChange={onChangeComments}
        />
      )}
    </>
  )
}
