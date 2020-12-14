import React from "react"
import styles from "../styles/Home.module.css"
import Link from "next/link"

const Login = props => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <Link href="/">Home</Link>
    </div>
  )
}

export default Login
