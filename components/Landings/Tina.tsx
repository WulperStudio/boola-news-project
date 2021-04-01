import React, { useEffect } from "react"
import { useCMS, useForm, usePlugin } from "tinacms"
import axios from "axios"
import { InlineForm, InlineBlocks } from "react-tinacms-inline"
import { heroBlock } from "./components/Hero"
import configTinaForm from "./configTinaForm"

const updateLandings = (id: any, data, token: string) =>
  axios.put(`${process.env.strapiServer}/pages/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export default function TinaEdit({ id, token, initialValues, edit }) {
  const cms = useCMS()
  const formConfig = {
    id: "./data/data.js",
    initialValues: initialValues,
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
      updateLandings(id, { data }, token)
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
