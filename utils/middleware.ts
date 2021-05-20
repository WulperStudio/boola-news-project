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
  return await axios.post(
    `${process.env.strapiServer}/auth/local`, { identifier, password }
  ).then(async response => {
    if (response.data.jwt) {
      jsCookie.set("token", response.data.jwt)
      await Router.push(redirect)
      return true
    }
  }).catch(error => {
    return false
  })
  // @ts-ignore
  /* const result = await loginApi.json()
   if (result.jwt) {
     jsCookie.set("token", result.jwt)
     await Router.push(redirect)
     //await Router.back()
   }*/
}

export async function setLogout(redirect: string = "/login") {
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
    Location: "/admin/login"
  })
  res.end()
}

export async function getSessionData({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  const { token } = await getAppCookies(req)
  let dataSession = {}
  let dataBlog = {}

  if (!token) {
    redirectLogin(res)
  }

  try {
    const query1 = await axios.get(`${process.env.strapiServer}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    const query2 = await axios.get(`${process.env.strapiServer}/blogs?domain=${req.headers.host}`)

    if (query1.status !== 200 || query2.status !== 200) {
      redirectLogin(res)
    }
    dataSession = query1.data
    dataBlog = query2.data[0]
  } catch (e) {
    redirectLogin(res)
  }
  return { props: { token, dataSession, dataBlog, domain: req.headers.host } }

}

export interface getSessionDataInterface{
  token: string
  domain: string
  dataSession: any
  dataBlog: any
}