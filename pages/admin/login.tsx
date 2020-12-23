import React, { ChangeEvent, useState } from "react"
import Link from "next/link"
import { getSessionData, setLogout, setLogin } from "../../utils/middleware"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"

const LoginAdmin = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [identifier, setIdentifier] = useState("arsd")
  const [password, setPassword] = useState("*12Tres4")

  async function onSubmitHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(!loading)
    await setLogin({ identifier, password, redirect: "/admin" })
    setLoading(false)
  }

  return (
    <AdminTheme loginView>
      <h1>Login</h1>
      <Link href="/">Home</Link>
      {loading && "loading..."}
      {!props.token && (
        <form className="form-login card" method="POST" onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="text"
              id="email"
              name="identifier"
              placeholder="Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-block btn-warning">
              Login
            </button>
          </div>
        </form>
      )}
      {props.token && (
        <button type="button" onClick={setLogout}>
          Logout
        </button>
      )}
    </AdminTheme>
  )
}


export default LoginAdmin
