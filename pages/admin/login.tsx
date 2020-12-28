import React, { useState } from "react"
import { setLogin } from "../../utils/middleware"
import AdminTheme from "@wulpers-ui/core/components/templates/Admin"
import SignIn, { OnSubmitProps } from "@wulpers-ui/core/components/organisms/SignIn/SignIn"

const LoginAdmin = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState("")
  //const identifier = "arsd";
  //const password = "*12Tres4";

  async function onSubmitHandler({ identifier, password }: OnSubmitProps) {
    setLoading(!loading)
    await setLogin({ identifier, password, redirect: "/admin" }).then(response => {
      if (!response) {
        setErrorText("Incorrect email or password!")
      }
    })
    setLoading(false)
  }

  return (
    <AdminTheme loginView>
      <SignIn onSubmit={onSubmitHandler} loading={loading} errorText={errorText}
              title="Start using \n**Sheldon’s power** " />
    </AdminTheme>
  )
}


export default LoginAdmin
