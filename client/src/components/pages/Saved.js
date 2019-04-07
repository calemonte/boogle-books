import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Card from "../layouts/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import API from "../../utils/API";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});

class Saved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  componentDidMount() {
    this.displayBooks();
  }

  displayBooks = () => {
    API.getSavedBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.displayBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={this.props.classes.heroUnit}>
            <div className={this.props.classes.heroContent}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Saved Books
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                View your saved books.
              </Typography>
            </div>
          </div>
          <div
            className={classNames(
              this.props.classes.layout,
              this.props.classes.cardGrid
            )}
          >
            {/* End hero unit */}
            <Grid container spacing={40}>
              {this.state.books.map(book => (
                <Grid item key={book._id} sm={6} md={4} lg={3}>
                  <Card
                    key={book._id}
                    title={book.title}
                    author={book.authors}
                    image={book.image}
                    description={book.description}
                    link={book.link}
                    onClick={() => this.deleteBook(book._id)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Saved.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Saved);
