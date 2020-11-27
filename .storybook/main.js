module.exports = {
  stories: ["../src/**/*.stories.mdx"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs",
    "@storybook/addon-a11y/register",
    "@storybook/addon-contexts/register",
    "@storybook/addon-viewport/register",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true
      },
    }
  ]
};
