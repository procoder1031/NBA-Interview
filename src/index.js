/*import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";

import "bootstrap/dist/css/bootstrap.css";
import "../src/assets/scss/now-ui-dashboard.css?v=1.1.1";
import "../src/assets/css/demo.css";
ReactDOM.render(<Main />, document.getElementById("root"));
*/

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../src/assets/scss/now-ui-dashboard.css?v=1.1.1";
import "../src/assets/css/demo.css";

import indexRoutes from "../src/routes/index.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} key={key} component={prop.component} />;
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);
