import React from "react"
import Link from "next/link"
// @ts-ignore
import styles from "../styles/Home.module.css"

const Login = (props: any) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <Link href="/">Home</Link>
    </div>
  )
}

export default Login
