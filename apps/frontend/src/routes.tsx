import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routeBuilder, { ROUTES } from "@app/component/src/service/routeBuilder";
import TodoPage from "@app/component/src/pages/todo/TodoPage";
import "@app/asset/styles/app.scss";

function Routes() {
  const route = (routeName: ROUTES) => routeBuilder(routeName).route;

  return (
    <div className="App">
      <Switch>
        <Route exact path={route(ROUTES.home)}>
          <TodoPage />
        </Route>
        <Route>
          <Redirect to={route(ROUTES.home)} />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
