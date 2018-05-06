import React, { PureComponent } from "react";

import { Wrapper } from "./LoginContainer.styles";

import Login from "../components/login";

class CheckoutContainer extends PureComponent {
  render() {
    return (
      <Wrapper>
        <Login />
      </Wrapper>
    );
  }
}

export default CheckoutContainer;
