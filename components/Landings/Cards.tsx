import React from "react"
import Router from "next/router"
import GridContainer from "@wulpers-ui/core/components/containers/Grid"
import Fab from "@wulpers-ui/core/components/atoms/Fab"
import Card from "@wulpers-ui/core/components/molecules/Card"
import FilterIcon from "@wulpers-ui/core/components/icons/Filter"

const LandingsCards = ({ data, loading, error }) => {
  if (loading) {
    return <div />
  } else if (error) {
    return <div>Error Page</div>
  } else {
    return (
      <GridContainer>
        {data.map(({ id, path }: any) => (
          <Card
            title={path}
            avatar={path}
            action={
              <Fab
                size="small"
                style={{ background: "#FFF", color: "#613EEA" }}
                onClick={() => {
                  Router.push(`/admin/landings/edit/${id}`)
                }}
              >
                <FilterIcon />
              </Fab>
            }
            quantities={[
              { title: "Helpers", detail: "" },
              { title: "Corrections", detail: "" },
              { title: "Deadline", detail: "" },
              { title: "Status", detail: "Review" },
            ]}
          />
        ))}
      </GridContainer>
    )
  }
}

export default LandingsCards
