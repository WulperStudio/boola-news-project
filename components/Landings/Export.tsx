import React, { useState, useReducer, useEffect } from "react"
import Router from "next/router"
import axios from "axios"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import AsideFixed from "@wulpers-ui/core/components/containers/AsideFixed"
import CustomFormPost, {
  ValidateForm,
} from "@wulpers-ui/core/components/organisms/CustomFormPost"
import FormRow, {
  FormContainer,
} from "@wulpers-ui/core/components/containers/FormRow"
import Dropzone from "@wulpers-ui/core/components/atoms/DropZone"
import Typography from "@wulpers-ui/core/components/atoms/Typography"
import PrincipalFormPost from "@wulpers-ui/core/components/organisms/PrincipalFormPost"
import "@wulpers-ui/core/assets/MediumEditor.styles.min.css"
import { getSessionData } from "../../utils/middleware"
import EyeIcon from "@wulpers-ui/core/components/icons/Eye"
import SaveIcon from "@wulpers-ui/core/components/icons/Save"
import { uploadMultipleFiles, countPostByDomainAndSlug } from "../../queries"
import TextField from "@material-ui/core/TextField"
import useAppContext from "../ContextProvider"

export default function Create({ token, domain, dataSession, dataBlog }: any) {
  const [state] = useAppContext()
  console.log(">>>", state.temp)
  const reducer = (state: any, action: any) => ({ ...state, ...action })
  const prefixFiles = ""
  const [data, setData] = useReducer(reducer, {
    title: "",
    image: [],
    data: state.temp,
  })
  const [errors, setErrors] = useReducer(reducer, {
    title: false,
    image: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  async function createPost() {
    if (!data.title || !data.image || !data.data) {
      setErrors({
        title: !data.title,
        image: !data.image.length,
        data: !data.content,
      })
    } else {
    }
  }

  return (
    <AdminTheme
      title=""
      buttonBackOnClick={() => {
        setLoading(true)
        Router.push("/admin/landings/cards-view")
      }}
      navBarConfig={[
        {
          title: "Create",
          icon: <SaveIcon />,
          onClick: () => createPost(),
          type: "Fav",
        },
      ]}
      loading={loading}
    >
      <AsideFixed>
        <FormContainer>
          <FormRow>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="primary"
            >
              {"CREATE COMPONET"}
            </Typography>
          </FormRow>

          <FormRow>
            <TextField
              label="Title"
              error={errors.title}
              helperText={errors.title ? "Incorrect entry." : ""}
              fullWidth
              defaultValue={data.title}
              value={data.title}
              onChange={e => {
                setErrors({ title: false })
                setData({ title: e.target.value })
              }}
            />
          </FormRow>

          <FormRow>
            <Dropzone
              label="Attach image"
              error={errors.image}
              helperText={errors.image ? "Incorrect entry." : ""}
              onChange={(files: any) => {
                setErrors({ image: false })
                setData({ image: files })
              }}
              initialFiles={data.image}
              prefixFiles={prefixFiles}
            />
          </FormRow>

          <FormRow>
            <div
              style={{
                border: "1px solid #CCC",
                padding: "10px",
                overflow: "scroll",
              }}
            >
              <code>{JSON.stringify(state.temp)}</code>
            </div>
          </FormRow>
        </FormContainer>
      </AsideFixed>
    </AdminTheme>
  )
}
