import React, { PureComponent } from "react";
import _ from "lodash";

import * as api from "../../server/api";
import {
  checkoutWrapper,
  CheckoutContent,
  CheckoutItem
} from "./Checkout.style";
import { Card, Divider } from "antd";

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

  fetchDiscount = (id, count, price) => {
    const { pricerules } = this.state;
    let newPrice = price;
    const validateRule = _.map(pricerules, (item, i) => {
      if (_.includes(item.jobads, id)) {
        if (item.ruleType === "discount") {
          newPrice = item.price_after_discount;
        }
      }
    });
    return newPrice;
  };

  render() {
    console.log(this.state);
    console.log(this.props);
    const {
      adCard: { newSelectedAds }
    } = this.props;

    if (_.isUndefined(newSelectedAds) && _.isEmpty(newSelectedAds)) {
      return null;
    }

    return (
      <checkoutWrapper>
        <Card
          style={{ marginTop: 20, textAlign: "center", margin: 30 }}
          title="Checkout Summary"
        >
          <CheckoutContent>
            <span>AD Type</span>
            <span>Quantity</span>
            <span>Gross Price</span>
            <span>Net Price</span>
          </CheckoutContent>
          <Divider />
          {_.map(newSelectedAds, (item, i) => (
            <CheckoutContent>
              <span style={{ maxWidth: 20 }}>{item.adType}</span>
              <span>{item.counter}</span>
              <span>{item.price}</span>
              <span>
                {this.fetchDiscount(item._id, item.counter, item.price)}
              </span>
            </CheckoutContent>
          ))}
        </Card>
      </checkoutWrapper>
    );
  }
}

export default Checkout;
