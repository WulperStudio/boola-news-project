import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import jsCookie from "js-cookie"
import Router from "next/router"
import axios from "axios"

export function getAppCookies(req: NextApiRequest): Record<string, string> {
  let parsedItems: Record<string, string> = {}
  if (req.headers.cookie) {
    const cookiesItems = req.headers.cookie.split("; ")
    cookiesItems.forEach(cookies => {
      const parsedItem = cookies.split("=")
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1])
    })
  }
  return parsedItems
}

export function verifyToken(jwtToken: string) {
  try {
    // @ts-ignore
    return jwt.verify(jwtToken)
  } catch (e) {
    return null
  }
}

type PropsSetLogin = {
  identifier: string, password: string, redirect: string
}

export async function setLogin({ identifier, password, redirect }: PropsSetLogin) {
  const loginApi = await fetch(`${process.env.strapiServer}/auth/local`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ identifier, password })
  }).catch(error => {
    console.error("Error:", error)
  })
  // @ts-ignore
  const result = await loginApi.json()
  if (result.jwt) {
    jsCookie.set("token", result.jwt)
    await Router.push(redirect)
    //await Router.back()
  }
}

export async function setLogout(redirect:string ="/login") {
  await jsCookie.remove("token")
  await Router.push(redirect)
}

export async function getToken({ req }: { req: NextApiRequest }) {
  const { token } = await getAppCookies(req)
  return {
    props: {
      token: token ? token : ""
    }
  }
}

function redirectLogin(res: NextApiResponse) {
  res.writeHead(302, { // or 301
    Location: "admin/login"
  })
  res.end()
}

export async function getSessionData({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  const { token } = await getAppCookies(req)
  let dataSession = {}

  if (!token) {
    redirectLogin(res)
  }

  try {
    const { data, status } = await axios.get(`${process.env.strapiServer}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    if (status !== 200) {
      redirectLogin(res)
    }
    dataSession = data
  } catch (e) {
    redirectLogin(res)
  }
  return { props: { dataSession } }

}