import React from "react"
import styles from "../styles/Home.module.css"
import Link from "next/link"

const SavedPosts = props => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>saved-posts</h1>
      <Link href="/">Home</Link>
    </div>
  )
}

export default SavedPosts
