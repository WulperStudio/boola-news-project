import React, { ReactNode } from "react"
import Grid from "@material-ui/core/Grid"

type Props = {
  children: ReactNode[]
}
export default function CustomGrid({ children }: Props) {
  return (
    <Grid container spacing={3}>
      {children.map((child, i: number) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          {child}
        </Grid>
      ))}
    </Grid>
  )
}
