import React from "react";
import { BlocksControls, InlineTextarea } from "react-tinacms-inline";
import Typography from "@material-ui/core/Typography";
import {
  jsonParse,
  textColorForm,
  textAlignForm,
  fontSizeForm,
  transitionsForm,
  jsonForm,
} from "../utils";
import Transitions from "./Transitions";

function Heading({ index, data }) {
  const { text_color, text_align, font_size, styles, transitions } = data;
  const stylesParse = jsonParse(styles);
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }}>
      <Transitions type={transitions} timeout={5000}>
        <Typography
          variant="h1"
          component="h1"
          style={{
            color: text_color,
            textAlign: text_align,
            fontSize: font_size,
            ...stylesParse,
          }}
        >
          <InlineTextarea name="headline" focusRing={false} />
        </Typography>
      </Transitions>
    </BlocksControls>
  );
}

export const HeadingBlock = {
  Component: Heading,
  template: {
    label: "Heading H1",
    defaultItem: {
      _template: "h1",
      headline: "Lorem Ipsum",
      text_color: "#ffffff",
      text_align: "center",
      font_size: "32px",
      styles: "{}",
      transitions: "None",
    },
    fields: [
      textColorForm(),
      textAlignForm,
      fontSizeForm(),
      transitionsForm,
      jsonForm,
    ],
  },
};
