import React, { useState, useEffect } from "react"
import { useCMS, useForm, usePlugin } from "tinacms"
import axios from "axios"
import { InlineForm, InlineBlocks } from "react-tinacms-inline"
import { heroBlock } from "./components/Hero"
import configTinaForm from "./configTinaForm"
import { NavbarBlock } from "./components/Navbar"

const updateLandings = (id: any, data, token: string) =>{
  return axios.put(`${process.env.strapiServer}/pages-histories/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })}

export default function Editor({ token, initialValues, edit }) {
  const [hitoryId, setHitoryId] = useState(initialValues.id)
  const cms = useCMS()
  const formConfig = {
    id: "./data/data.js",
    initialValues: initialValues.data,
    onSubmit(data) {
      cms.alerts.success("Saved!")
    },
    label: "Site information",
    fields: configTinaForm,
  }
  const [data, form] = useForm(formConfig)

  useEffect(() => {
    if (edit) {
      updateLandings(hitoryId, { data }, token).then((result: any) => {
        setHitoryId(result.data.id)
      })
    }
  }, [data])

  usePlugin(form)

  return (
    <div className="home">
      <InlineForm form={form}>
        <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
      </InlineForm>
    </div>
  )
}

const HOME_BLOCKS = {
  navbar: NavbarBlock,
  hero: heroBlock,
}
