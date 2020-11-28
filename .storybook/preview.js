import React from "react"
import { addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { withContexts } from "@storybook/addon-contexts/react";
import { contexts } from "./contexts";
import customViewports from "./customViewports";
import { addParameters } from "@storybook/client-api"

addParameters({
  backgrounds: [
    { name: "Default theme", value: "#ffffff", default: true },
    { name: "Dark theme", value: "#050449" }
  ]
});

addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(withContexts(contexts));

addParameters({
  viewport: { viewports: customViewports },
});
