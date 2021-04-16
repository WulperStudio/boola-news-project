import React from "react";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";

//TODO: Animación con Scroll https://www.react-reveal.com/examples/common/ 

export default function Transitions({ type, children, ...props }) {
  switch (type) {
    case "Collapse":
      return (
        <Collapse in={true} {...props}>
          {children}
        </Collapse>
      );
    case "Fade":
      return (
        <Fade in={true} {...props}>
          {children}
        </Fade>
      );
    case "Grow":
      return (
        <Grow in={true} {...props}>
          {children}
        </Grow>
      );
    case "Slide":
      return (
        <Slide in={true} {...props}>
          {children}
        </Slide>
      );
    case "Zoom":
      return (
        <Zoom in={true} {...props}>
          {children}
        </Zoom>
      );
    default:
      return children;
  }
}
