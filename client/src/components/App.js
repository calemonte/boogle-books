import React from "react";
import Search from "./pages/Search";
import NoMatch from "./pages/404";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TypoGraphy from "@material-ui/core/Typography";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <AppBar color="primary" position="static">
          <Toolbar>
            <TypoGraphy variant="title" color="inherit">
              Boogle Books
            </TypoGraphy>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
