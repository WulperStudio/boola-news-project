import React, { useState, useEffect } from "react"
import Router, { useRouter } from "next/router"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import AsideFixed from "@wulpers-ui/core/components/containers/AsideFixed"
import CustomFormPost, {
  ValidateForm,
} from "@wulpers-ui/core/components/organisms/CustomFormPost"
import PrincipalFormPost from "@wulpers-ui/core/components/organisms/PrincipalFormPost"
import "@wulpers-ui/core/assets/MediumEditor.styles.min.css"
import { getSessionData } from "../../../../utils/middleware"
import EyeIcon from "@wulpers-ui/core/components/icons/Eye"
import SaveIcon from "@wulpers-ui/core/components/icons/Save"
import PublishIcon from "@wulpers-ui/core/components/icons/Publish"
import {
  deleteMassivelyFilesById,
  updatePostById,
  getPostById,
  publishPostById,
  uploadMultipleFiles,
} from "../../../../queries"

export default function EditById({ token }) {
  const route = useRouter()
  const [data, setData] = useState(null)
  const [errors, setErrors] = useState({
    title: false,
    content: false,
    slug: false,
    image: false,
  })
  const [loading, setLoading] = useState(true)

  const setCustomForm = customForm => {
    setData({ ...data, customForm })
  }

  useEffect(() => {
    getPostById(route.query.id, token).then(response => {
      setData({
        ...response.data,
        customForm: response.data.customForm?.data
          ? response.data.customForm.data
          : [],
      })
    })

    setLoading(false)
  }, [])

  function PublishPost() {
    setLoading(true)
    publishPostById(data.id, token)
      .then(() => Router.push("/admin/campaigns/table-view"))
      .catch(error => {
        console.error("An error occurred: ", error.response)
      })
  }
  function validateContent(myString: string) {
    return myString.replace(/<[^>]*>?/gm, "")
  }

  function updatePost(preview: boolean) {
    const validateCustomForm = ValidateForm(data.customForm)
    if (
      !data.title ||
      !data.slug ||
      !data.image.length ||
      !validateContent(data.content) ||
      validateCustomForm.errors
    ) {
      setErrors({
        title: !data.title,
        slug: !data.slug,
        image: !data.image.length,
        content: !validateContent(data.content),
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
      return uploadMultipleFiles(files, token)
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
          //TODO: faltan los ids de las imágenes de CustomForm
          deleteMassivelyFilesById([data.deleteImageId], token)
            .then(response => {
              console.info("Response:", response)
            })
            .catch(error => {
              console.error("An error occurred:", error.response)
            })
          return updatePostById(
            data.id,
            {
              ...data,
              image: res[0].data,
              customForm: { data: updateCustomForm },
            },
            token
          )
            .then(response => {
              if (preview) {
                return Router.push(`/admin/campaigns/preview/${data.id}`)
              } else {
                return Router.push("/admin/campaigns/table-view")
              }
            })
            .catch(error => {
              console.error("An error occurred:", error.response)
            })
        })
        .catch(error => {
          console.error("An error occurred:", error.response)
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
          icon: <PublishIcon />,
          onClick: () => PublishPost(),
          type: "Fav",
        },
        {
          title: "Preview",
          icon: <EyeIcon />,
          onClick: () => updatePost(true),
          type: "Fav",
        },
        {
          title: "Udpate",
          icon: <SaveIcon />,
          onClick: () => updatePost(false),
          type: "Fav",
        },
      ]}
      loading={loading}
    >
      {data && (
        <AsideFixed>
          <PrincipalFormPost
            values={data}
            setValues={setData}
            errors={errors}
            setErrors={setErrors}
            prefixFiles={process.env.strapiServer}
          />
          <CustomFormPost
            title="CONTENT -> Title section"
            values={data.customForm}
            setValues={setCustomForm}
            prefixFiles={process.env.strapiServer}
          />
        </AsideFixed>
      )}
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData
