import React, { useState, useEffect } from "react"
import Router from "next/router"
import { useCMS, useForm, usePlugin } from "tinacms"
import axios from "axios"
import { InlineForm, InlineBlocks } from "react-tinacms-inline"
import { heroBlock } from "./components/Hero"
import configTinaForm from "./configTinaForm"

const updateLandings = (id: any, data, token: string) =>{
  console.log("hitoryId>>>",id)
  return axios.put(`${process.env.strapiServer}/pages-histories/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })}

export default function TinaEdit({ token, initialValues, edit }) {
  const [hitoryId, setHitoryId] = useState(initialValues.id)
  const cms = useCMS()
  const formConfig = {
    id: "./data/data.js",
    initialValues: initialValues.data,
    onSubmit(data) {
      console.log("data>>>", JSON.stringify(data))
      cms.alerts.success("Saved!")
    },
    label: "Site information",
    fields: configTinaForm,
  }
  const [data, form] = useForm(formConfig)

  useEffect(() => {
    if (edit) {
      updateLandings(hitoryId, { data }, token).then((result: any) => {
        console.log("result>>>", result.data.id)
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
  hero: heroBlock,
}
