import React, { Component } from "react";
import routes from "./routes";
import { Route, Redirect } from "react-router-dom";
import { Layout } from "antd";

const AuthenticatedRoute = ({ component: C, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.getItem("userAuth") ? (
        <C {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        {routes.map(
          ({ path, exact, component: C, type }) =>
            type === "protected" ? (
              <AuthenticatedRoute
                key={path}
                path={path}
                exact={exact}
                component={C}
              />
            ) : (
              <Route
                key={path}
                path={path}
                exact={exact}
                render={props => <C {...props} />}
              />
            )
        )}
      </Layout>
    );
  }
}

export default App;
