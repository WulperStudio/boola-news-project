import React, { useState, useEffect } from "react"
import Router, { useRouter } from "next/router"
import axios from "axios"
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

export default function EditById({ token, domain, dataSession, dataBlog }: any) {
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
    axios.get(`${process.env.strapiServer}/posts/${route.query.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        //console.log("Data>>>", response.data.customForm)
        setData({ 
          ...response.data,
          customForm: []
        })
      })
    
    setLoading(false)
  }, [])

  function PublishPost() {
    alert("PublishPost")
  }

  function createPost(preview: boolean) {
    const validateCustomForm = ValidateForm(data.customForm)

    if (
      !data.title ||
      !data.slug ||
      !data.image.length ||
      !data.content ||
      validateCustomForm.errors
    ) {
      setErrors({
        title: !data.title,
        slug: !data.slug,
        image: !data.image.length,
        content: !data.content,
      })
      setCustomForm(validateCustomForm.values)
    } else {
      setLoading(true)
      const formData = new FormData()
      data.image.forEach(image => {
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
          icon: <PublishIcon />,
          onClick: () => PublishPost(true),
          type: "Fav",
        },
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
      {data && <AsideFixed>
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
        />
      </AsideFixed>}
    </AdminTheme>
  )
}

export const getServerSideProps = getSessionData
