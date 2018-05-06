import React, { PureComponent } from "react";

import * as api from "../../server/api";

class Checkout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pricerules: [],
      userInfo: ""
    };
  }
  componentDidMount() {
    const {
      auth: { token, _id }
    } = this.props;
    // fetch the user price rules for final calcualtion
    api
      .fetchUserPriceRules(token, _id)
      .then(response => {
        this.setState({ pricerules: response.pricerules, userInfo: response });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    return <div>the checkout logic display here</div>;
  }
}

export default Checkout;
