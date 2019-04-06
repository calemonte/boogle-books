import React from "react";
import Typography from "@material-ui/core/Typography";

function Footer(props) {
  return (
    <footer className={props.className}>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Made by KW.
      </Typography>
    </footer>
  );
}

export default Footer;