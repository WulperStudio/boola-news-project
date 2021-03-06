import React, { useState, useEffect } from "react"
import Router from "next/router"
import axios from "axios"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import AsideFixed from "@wulpers-ui/core/components/containers/AsideFixed"
import CustomFormPost, {
  ValidateForm,
} from "@wulpers-ui/core/components/organisms/CustomFormPost"
import PrincipalFormPost from "@wulpers-ui/core/components/organisms/PrincipalFormPost"
import "@wulpers-ui/core/assets/MediumEditor.styles.min.css"
import { getSessionData } from "../../../utils/middleware"
import EyeIcon from "@wulpers-ui/core/components/icons/Eye"
import SaveIcon from "@wulpers-ui/core/components/icons/Save"
import { uploadMultipleFiles, countPostByDomainAndSlug } from "../../../queries"
import Comments from "../../../utils/Comments"

export default function Create({ token, domain, dataSession, dataBlog }: any) {
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
  const [errors, setErrors] = useState({
    title: false,
    content: false,
    slug: false,
    image: false,
  })
  const [loading, setLoading] = useState(true)

  const setCustomForm = (customForm: any) => {
    setData({ ...data, customForm })
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  const validateSlug = async (slug: string) => {
    if (data.slug) {
      return await countPostByDomainAndSlug(domain, slug, token).then(
        (res: any) => !!parseInt(res.data, 10)
      )
    }
    return false
  }

  async function createPost(preview: boolean) {
    const validateCustomForm = ValidateForm(data.customForm)
    const validatedSlug = await validateSlug(data.slug)
    if (
      !data.title ||
      !data.image.length ||
      !data.content ||
      validatedSlug ||
      validateCustomForm.errors
    ) {
      setErrors({
        title: !data.title,
        slug: validatedSlug,
        image: !data.image.length,
        content: !data.content,
      })
      setCustomForm(validateCustomForm.values)
    } else {
      setLoading(true)
      let files = [data.image[0]]
      data.customForm
        .filter(form => form.type === "image")
        .forEach(image => {
          files.push(image.value[0])
        })
      uploadMultipleFiles(files, token)
        .then((res: any) => {
          let j = 0
          const updateCustomForm = data.customForm.map((form, i) => {
            if (form.type === "image") {
              j = j + 1
              return { ...form, value: res[j].data }
            } else {
              return form
            }
          })
          return axios
            .post(
              `${process.env.strapiServer}/posts`,
              {
                ...data,
                image: res[0].data,
                customForm: { data: updateCustomForm },
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response: { data: { slug: any } }) => {
              if (preview) {
                return Router.push(`/${response.data.slug}`)
              } else {
                return Router.push("/admin/campaigns/table-view")
              }
            })
            .catch((error: { response: any }) => {
              console.error("An error occurred:", error.response)
            })
        })
        .catch((err: any) => {
          console.error(err)
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
          icon: <EyeIcon />,
          onClick: () => createPost(true),
          type: "Fav",
        },
        {
          title: "Create",
          icon: <SaveIcon />,
          onClick: () => createPost(false),
          type: "Fav",
        },
      ]}
      loading={loading}
    >
      <AsideFixed>
        <PrincipalFormPost
          values={data}
          setValues={setData}
          errors={errors}
          setErrors={setErrors}
        />
        <CustomFormPost
          title="CONTENT -> Title section"
          values={data.customForm}
          setValues={setCustomForm}
          prefixFiles={process.env.strapiServer}
        />
      </AsideFixed>
      <Comments token={token} dataSession={dataSession} />
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData
