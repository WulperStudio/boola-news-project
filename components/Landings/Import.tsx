import React, { Component, useState } from "react"
import Router, { useRouter } from "next/router"
import axios from "axios"
import { useAsync } from "react-async-hook"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import GridContainer from "@wulpers-ui/core/components/containers/Grid"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardActions from "@material-ui/core/CardActions"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Components from "./Components"

const fetchComponents = (domain: string, token: string) =>
  axios.get(`${process.env.strapiServer}/components`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const Import = ({ token, domain }) => {
  const { query } = useRouter()
  const { result, error, loading } = useAsync(fetchComponents, [domain, token])
  return (
    <AdminTheme
      title="**Import Components**"
      buttonBackOnClick={() => {
        Router.push(`/admin/landings/edit/${query.id}`)
      }}
      loading={loading}
    >
      <Components
        id={query.id}
        token={token}
        data={result ? result.data : []}
        loading={loading}
        error={error}
      />
    </AdminTheme>
  )
}
