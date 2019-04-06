import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { Link } from "react-router-dom";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

function SavedCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="h2">
            {props.author}
          </Typography>
          <Typography component="p">{props.description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <a
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            Learn More
          </a>
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() =>
            props.saveBook({
              title: props.title,
              authors: props.author,
              description: props.description,
              image: props.image,
              link: props.link
            })
          }
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

SavedCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SavedCard);