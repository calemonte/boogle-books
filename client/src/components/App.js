import React from "react";
import Search from "./pages/Search";
import NoMatch from "./pages/404";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
