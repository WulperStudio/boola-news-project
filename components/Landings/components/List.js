import React from "react";
import { BlocksControls } from "react-tinacms-inline";
import Typography from "@material-ui/core/Typography";
import { jsonParse, jsonForm } from "../utils";

export const List = ({ index, data }) => {
  const { list, styles } = data;
  const stylesParse = jsonParse(styles);
  return (
    <BlocksControls index={index}>
      <Typography variant="body1" component="ul" styles={{ ...stylesParse }}>
        {list &&
          list.map((l, i) => (
            <Typography variant="body1" component="li" key={i}>
              {l.item}
            </Typography>
          ))}
      </Typography>
    </BlocksControls>
  );
};

export const ListBlock = {
  Component: List,
  template: {
    label: "List",
    defaultItem: {
      _template: "list",
      list: [{ item: "item 1" }, { item: "item 2" }, { item: "item 3" }],
    },
    fields: [
      {
        label: "List",
        name: "list",
        component: "group-list",
        itemProps: (value) => ({
          label: value.item,
        }),
        defaultItem: () => {
          return {
            item: "new item",
          };
        },
        fields: [
          {
            label: "Item",
            name: "item",
            component: "text",
          },
          jsonForm,
        ],
      },
    ],
  },
};
