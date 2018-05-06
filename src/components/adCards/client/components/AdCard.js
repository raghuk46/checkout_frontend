import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import * as api from "../../server/api";

import { Row, Col, Card, Button, Icon } from "antd";
import { CardWrapper, PriceWrapper, AdSelectionWrapper } from "./AdCard.styles";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

class AdCard extends PureComponent {
  static propTypes = {
    auth: PropTypes.shape({
      token: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      ads: [],
      loading: false,
      selectedAds: []
    };
  }

  componentDidMount() {
    const {
      auth: { token }
    } = this.props;
    // fetch all ads from api
    this.setState({ loading: true });
    api
      .fetchAds(token)
      .then(response => {
        this.setState({
          ads: response,
          loading: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleAdSelection = (item, type) => {
    const { selectedAds } = this.state;
    let newSelectedAds = !_.isEmpty(selectedAds) ? selectedAds : [];
    let record = _.find(newSelectedAds, { adType: item.adType });
    let newrecord = {};
    if (type === "incerement") {
      if (_.isUndefined(record) && _.isEmpty(newSelectedAds)) {
        record = {
          adType: item.adType,
          _id: item._id,
          price: item.price,
          counter: 1
        };
        newSelectedAds.push(record);
        this.setState({ selectedAds: newSelectedAds });
      } else if (_.isUndefined(record) && !_.isEmpty(newSelectedAds)) {
        record = {
          adType: item.adType,
          _id: item._id,
          price: item.price,
          counter: 1
        };
        newSelectedAds.push(record);
        this.setState({ selectedAds: newSelectedAds });
      } else {
        newrecord = { ...record, counter: record.counter + 1 };
        newSelectedAds.pop(record);
        newSelectedAds.push(newrecord);
        this.setState({ selectedAds: newSelectedAds });
      }
      this.props.setSelectedAd({ newSelectedAds });
    }
  };

  fetchCounter = item => {
    const {
      adCard: { newSelectedAds }
    } = this.props;
    return _.get(_.find(newSelectedAds, { adType: item.adType }), "counter", 0);
  };

  render() {
    const adsData = this.state.ads;
    return (
      <CardWrapper>
        <Row gutter={16}>
          {_.map(adsData, (item, i) => (
            <Col span={8} key={i}>
              <Card title={item.name}>
                <p> Short description will be shown here</p>
                <PriceWrapper>{item.price}</PriceWrapper>
                <AdSelectionWrapper>
                  <Button
                    disabled
                    type="danger"
                    onClick={() => this.handleAdSelection(item, "decrement")}
                  >
                    <Icon type="minus" />
                  </Button>
                  <span key={item.adType}>{this.fetchCounter(item)}</span>
                  <Button
                    type="primary"
                    onClick={() => this.handleAdSelection(item, "incerement")}
                  >
                    <Icon type="plus" />
                  </Button>
                </AdSelectionWrapper>
              </Card>
            </Col>
          ))}
        </Row>
      </CardWrapper>
    );
  }
}

const mapStateToProps = state => ({
  adCard: state.adCard
});

export default connect(mapStateToProps, actions)(AdCard);
