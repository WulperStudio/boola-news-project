import React, { useState, useEffect } from "react"
import Router from "next/router"
import axios from "axios"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import AsideFixed from "@wulpers-ui/core/components/containers/AsideFixed/AsideFixed"
import TextField from "@wulpers-ui/core/components/atoms/Form/TextField"
import Dropzone from "@wulpers-ui/core/components/atoms/DropZone"
import FormLabel from "@wulpers-ui/core/components/atoms/FormLabel"
import Typography from "@wulpers-ui/core/components/atoms/Typography"
import Switch from "@wulpers-ui/core/components/atoms/Switch"
import CustomFormPost, {
  ValidateForm,
} from "@wulpers-ui/core/components/organisms/CustomFormPost"
import FormRow, {
  FormContainer,
} from "@wulpers-ui/core/components/containers/FormRow"
import MediumEditor from "@wulpers-ui/core/components/atoms/MediumEditor/MediumEditor"
import "@wulpers-ui/core/assets/MediumEditor.styles.min.css"
import { getSessionData } from "../../../utils/middleware"
import slug from "slug"

export default function Create({ token, domain, dataSession, dataBlog }: any) {
  console.log("dataSession>>>", JSON.stringify(dataSession))
  const [data, setData] = useState({
    title: "",
    content: "",
    slug: "",
    status: "Draft",
    publishedDate: "",
    shares: 0,
    reach: 0,
    views: 0,
    leads: 0,
    winned: 0,
    image: [],
    blog: dataBlog,
    responsable: dataSession,
    customForm: [],
  })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [titleError, setTitleError] = useState(false)
  const [slugError, setSlugError] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [contentError, setContentError] = useState(false)

  const setCustomForm = customForm => {
    setData({ ...data, customForm })
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    console.log("images>>>", images)
  }, [images])

  function createPost(preview: boolean) {
    const validateCustomForm = ValidateForm(data.customForm)

    if (
      !data.title ||
      !data.slug ||
      !images.length ||
      !data.content ||
      validateCustomForm.errors
    ) {
      setTitleError(!data.title)
      setSlugError(!data.slug)
      setImageError(!images.length)
      setContentError(!data.content)
      setCustomForm(validateCustomForm.values)
    } else {
      setLoading(true)
      const formData = new FormData()
      images.forEach(image => {
        formData.append("files", image)
      })
      return axios
        .post(`${process.env.strapiServer}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          return axios
            .post(
              `${process.env.strapiServer}/posts`,
              { ...data, image: res.data },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(response => {
              console.log("Data: ", response.data)
              if (preview) {
                return Router.push(`/${response.data.slug}`)
              } else {
                return Router.push("/admin/campaigns/table-view")
              }
            })
            .catch(error => {
              console.log("An error occurred:", error.response)
            })
        })
        .catch(err => {
          console.log(err)
          return err
        })
    }
  }

  return (
    <AdminTheme
      title=""
      buttonBackOnClick={() => {
        setLoading(true)
        Router.push("/admin/campaigns/table-view")
      }}
      navBarConfig={[
        {
          title: "Preview",
          onClick: () => createPost(true),
          type: "Button",
        },
        {
          title: "Create",
          onClick: () => createPost(false),
          type: "Button",
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
              {"POST DESCRIPTION -> Title section"}
            </Typography>
          </FormRow>

          <FormRow>
            <TextField
              label="Title"
              error={titleError}
              helperText={titleError ? "Incorrect entry." : ""}
              fullWidth
              defaultValue={data.title}
              value={data.title}
              onChange={(e: any) => {
                setTitleError(false)
                setSlugError(false)
                setData({
                  ...data,
                  title: e.target.value,
                  slug: slug(e.target.value),
                })
              }}
            />
          </FormRow>

          <FormRow>
            <TextField
              label="Slug"
              error={slugError}
              helperText={slugError ? "Incorrect entry." : ""}
              fullWidth
              defaultValue={data.slug}
              value={data.slug}
              InputProps={{ readOnly: true }}
              onChange={(e: any) => {
                setSlugError(false)
                setData({ ...data, slug: e.target.value })
              }}
            />
          </FormRow>

          <FormRow>
            <Dropzone
              label="Attach image"
              error={imageError}
              helperText={imageError ? "Incorrect entry." : ""}
              onChange={(files: any) => {
                setImageError(false)
                setImages(files)
              }}
            />
          </FormRow>

          <FormRow>
            <FormLabel size="small" component="legend">
              Status
            </FormLabel>
            <Switch
              checked={data.status === "Publish"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  status: e.target.checked ? "Publish" : "Draft",
                  publishedDate: e.target.checked ? Date.now().toString() : "",
                })
              }
              name="checkedA"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            {data.status}
          </FormRow>

          <FormRow>
            <MediumEditor
              label="Paragraph"
              error={contentError}
              helperText={contentError ? "Incorrect entry." : ""}
              fullWidth
              multiline
              rows={4}
              value={data.content}
              onChange={value => {
                setContentError(false)
                setData({ ...data, content: value })
              }}
            />
          </FormRow>
        </FormContainer>
        <CustomFormPost
          title="CONTENT -> Title section"
          values={data.customForm}
          setValues={setCustomForm}
        />
      </AsideFixed>
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData
