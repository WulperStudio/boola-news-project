import React, { ReactElement } from "react"
import Admin from "../components/template/Admin/Admin"
import SignIn from "../components/organisms/SignIn/SignIn"

export default function Home(): ReactElement {
  const formatRows = [
    { key: "name" },
    { key: "calories", align: "right", chip: true },
    { key: "fat", align: "right", image: "https://material-ui.com/static/images/avatar/1.jpg" },
    { key: "carbs", align: "right" },
    { key: "protein", align: "right" }
  ]
  return (
    <Admin sidebar={false}>
      <SignIn onSubmit={(e) => console.log(e)}/>
    </Admin>
  )
}
