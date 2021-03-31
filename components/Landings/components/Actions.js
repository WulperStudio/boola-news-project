import React from "react";
import { BlocksControls } from "react-tinacms-inline";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

export const Actions = ({ index, data }) => {
  const { actions, text_align } = data;
  return (
    <BlocksControls index={index}>
      <div style={{ textAlign: text_align }}>
        {actions &&
          actions.map(function (action, index) {
            let element = null;
            if (action.type === "button") {
              element = (
                <Button
                  style={{ textTransform: "none", marginRight: "12px" }}
                  color={action.color}
                  variant="contained"
                  size={action.size}
                >
                  {action.label}
                </Button>
              );
            } else {
              element = (
                <Link
                  style={{ marginRight: "12px" }}
                  href={action.link}
                  color={action.color}
                  size={action.size}
                >
                  {action.label}
                </Link>
              );
            }
            return element;
          })}
      </div>
    </BlocksControls>
  );
};

export const ActionsBlock = {
  Component: Actions,
  template: {
    label: "Actions",
    defaultItem: {
      _template: "actions",
      text_align: "center",
      actions: [
        {
          label: "Action Label",
          link: "/",
          type: "button",
          color: "primary",
          size: "medium",
        },
      ],
    },
    fields: [
      {
        name: "text_align",
        label: "Text Alignment",
        component: "select",
        options: ["center", "left", "right"],
      },
      {
        name: "actions",
        label: "Actions",
        component: "group-list",
        itemProps: (item) => ({
          label: item.label,
        }),
        defaultItem: () => ({
          label: "Action Label",
          link: "/",
          type: "button",
          color: "primary",
          size: "medium",
        }),
        fields: [
          {
            label: "Label",
            name: "label",
            component: "text",
          },
          {
            label: "Likn",
            name: "link",
            component: "text",
          },
          {
            label: "Type",
            name: "type",
            component: "select",
            options: [
              { label: "Button", value: "button" },
              { label: "Link", value: "link" },
            ],
          },
          {
            label: "Color",
            name: "color",
            component: "select",
            options: [
              { label: "Primary", value: "Primary" },
              { label: "Secondary", value: "Secondary" },
            ],
          },
          {
            label: "Size",
            name: "size",
            component: "select",
            options: [
              { label: "Small", value: "small" },
              { label: "Medium", value: "medium" },
              { label: "Large", value: "large" },
            ],
          },
        ],
      },
    ],
  },
};
