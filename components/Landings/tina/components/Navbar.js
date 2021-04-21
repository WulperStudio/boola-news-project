import React from "react"
import { BlocksControls } from "react-tinacms-inline"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Container from "@material-ui/core/Container"
import { jsonParse, jsonForm } from "../utils"

export function Navbar({ data }) {
  const { logo, items, styles } = data
  const stylesParse = jsonParse(styles)
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        ...stylesParse,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="test" style={{maxHeight:100}}/>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {items.map(item => {
          if (item.type === "Link") {
            return (
              <Link
                href={item.href}
                style={{ fontSize: 16, marginLeft: 12 }}
                href="/#"
              >
                {item.label}
              </Link>
            )
          } else {
            return (
              <Button
                variant="contained"
                color="primary"
                style={{ textTransform: "none", marginLeft: 12 }}
              >
                {item.label}
              </Button>
            )
          }
        })}
      </div>
    </nav>
  )
}

export function NavbarWithControls({ index, data }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <Container>
        <Navbar data={data} />
      </Container>
    </BlocksControls>
  )
}

export const NavbarDefaultItem = {
  logo: "https://fakeimg.pl/190x56/?text=Logo%20%20190%20x%2056",
  items: [
    {
      label: "Link Example",
      href: "/",
      type: "Link",
    },
    {
      label: "Button Example",
      href: "/",
      type: "Button",
    },
  ],
  styles: "{}",
}

export const NavbarFields = [
  {
    name: "logo",
    label: "Logo",
    component: "image",
    parse: media =>
      media.filename
        ? `${process.env.strapiServer}/uploads/${media.filename}`
        : "https://fakeimg.pl/190x56/?text=Logo%20%20190%20x%2056",
    uploadDir: () => "/",
    previewSrc: src => src,
    focusRing: false,
    clearable: true,
  },
  {
    label: "Nav Items",
    name: "items",
    component: "group-list",
    itemProps: item => ({
      label: item.label,
    }),
    defaultItem: () => ({
      label: "Nav Link",
    }),
    fields: [
      {
        label: "Label",
        name: "label",
        component: "text",
      },
      {
        label: "Link",
        name: "href",
        component: "text",
      },
      {
        label: "Type",
        name: "type",
        component: "select",
        options: ["Button", "Link"],
      },
    ],
  },
  jsonForm,
]

export const NavbarBlock = {
  Component: NavbarWithControls,
  template: {
    label: "Navbar",
    defaultItem: { _template: "navbar", ...NavbarDefaultItem },
    fields: NavbarFields,
  },
}
