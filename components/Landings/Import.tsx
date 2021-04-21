import React, { useState } from "react"
import Router, { useRouter } from "next/router"
import axios from "axios"
import { useAsync } from "react-async-hook"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import Plus from "@wulpers-ui/core/components/icons/Plus"
import Filter from "@wulpers-ui/core/components/icons/Filter"

export const Import = ({ token, domain, dataSession }) => {
  const { query } = useRouter()
  return (
    <AdminTheme
      title="**Import Components**"
      buttonBackOnClick={() => {Router.push(`/admin/landings/edit/${query.id}`)}}
    >
      Import Components
    </AdminTheme>
  )
}
