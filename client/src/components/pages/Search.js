import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Card from "../layouts/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      title: "",
      message: "No books to display."
    };
  }

  saveBook = book => {
    const { title, authors, description, image, link } = book;
    API.saveBook({
      title,
      authors,
      description,
      image,
      link
    })
      .then(res => alert("Book saved!"))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.getBooks(this.state.title)
        .then(res => {
          if (res.data.totalItems > 0) {
            this.setState({
              books: res.data.items
            });
          } else {
            this.setState({
              books: [],
              message: "No results were found."
            });
          }
        })
        .catch(err => console.log(err));
    }
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
                Search
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                Search the Google Books API and find something new to read
              </Typography>
              <div className={this.props.classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <TextField
                    id="standard-full-width"
                    style={{ margin: 8 }}
                    placeholder="Enter book title to start your search"
                    fullWidth
                    margin="normal"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!this.state.title}
                    onClick={this.handleFormSubmit}
                    className={this.props.classes.button}
                  >
                    Submit
                  </Button>
                </Grid>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              this.props.classes.layout,
              this.props.classes.cardGrid
            )}
          >
            {/* End hero unit */}
            {!this.state.books.length ? (
              <Grid>
                <Typography
                  variant="h6"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  {this.state.message}
                </Typography>
              </Grid>
            ) : (
              <Grid container spacing={40}>
                {this.state.books.map(book => (
                  <Grid item key={book.id} sm={6} md={4} lg={3}>
                    <Card
                      key={book.id}
                      title={book.volumeInfo.title}
                      author={
                        book.volumeInfo.authors &&
                        book.volumeInfo.authors.length > 1
                          ? book.volumeInfo.authors.join(", ")
                          : book.volumeInfo.authors
                      }
                      image={
                        book.volumeInfo.imageLinks
                          ? book.volumeInfo.imageLinks.thumbnail
                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Book_Collage.png/620px-Book_Collage.png"
                      }
                      description={
                        book.searchInfo
                          ? book.searchInfo.textSnippet
                          : "No description available."
                      }
                      link={book.volumeInfo.infoLink}
                      saved={false}
                      onClick={this.saveBook}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Search);
