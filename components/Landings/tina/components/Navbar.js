import React from "react";
import { BlocksControls } from "react-tinacms-inline";
import Button from "@material-ui/core/Button";
import {
  jsonParse,
  textColorForm,
  textAlignForm,
  fontSizeForm,
  jsonForm,
} from "../utils";

function Navbar({ index, data }) {
  const { text_color, text_align, font_size, styles } = data;
  const stylesParse = jsonParse(styles);
  return (
    <BlocksControls index={index}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: text_color,
          textAlign: text_align,
          fontSize: font_size,
          ...stylesParse,
        }}
      >
        <div>
          <img
            src="https://fakeimg.pl/190x56/?text=Logo%20%20190%20x%2056"
            alt="test"
          />
        </div>
        <div>
          <a href="/#">test</a>
          <Button variant="contained" color="primary">
            test
          </Button>
        </div>
      </nav>
    </BlocksControls>
  );
}

export const NavbarBlock = {
  Component: Navbar,
  template: {
    label: "Navbar",
    defaultItem: {
      _template: "navbar",
      logo: "",
      text_color: "#ffffff",
      text_align: "center",
      font_size: "32px",
      styles: "{}",
    },
    fields: [textColorForm(), textAlignForm, fontSizeForm(), jsonForm],
  },
};
