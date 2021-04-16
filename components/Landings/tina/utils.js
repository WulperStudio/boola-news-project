export const textColorForm = (colors = ["#ffffff", "#888888", "#000000"]) => ({
  name: "text_color",
  label: "Text Color",
  component: "color",
  widget: "block",
  colors: colors,
});

export const textAlignForm = {
  name: "text_align",
  label: "Text Alignment",
  component: "select",
  options: ["center", "left", "right"],
};

export const fontSizeForm = (sizes = ["24px", "32px", "36px"]) => ({
  name: "font_size",
  label: "Font Size",
  component: "select",
  options: sizes,
});

export const jsonForm = {
  name: "styles",
  label: "Style JSON",
  component: "textarea",
};

export const formattingTools = [
  textColorForm(),
  textAlignForm,
  fontSizeForm(),
  jsonForm,
];

export const formattingValues = {
  text_color: "inherit",
  text_align: "center",
  font_size: "32px",
  styles: "{}",
};

export const transitionsForm = {
  name: "transitions",
  label: "Transitions",
  component: "select",
  options: ["None", "Collapse", "Fade", "Grow", "Slide", "Zoom"],
};

const IsJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const jsonParse = (text) => (IsJsonString(text) ? JSON.parse(text) : {});
