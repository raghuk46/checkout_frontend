import React, { PureComponent } from "react";

import { connect } from "react-redux";

import AdCard from "../components/adCards";
import Checkout from "../components/checkout";

class CheckoutContainer extends PureComponent {
  render() {
    return (
      <div>
        <AdCard {...this.props} />
        <Checkout {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  adCard: state.adCard
});

export default connect(mapStateToProps, null)(CheckoutContainer);
