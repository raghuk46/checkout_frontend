import React, { PureComponent } from "react";

import { Form, Icon, Input, Button } from "antd";
import { FormWrapper, FormItemWrapper } from "./Login.styles";
import _ from "lodash";

import { connect } from "react-redux";
import * as actions from "../redux/actions";
import * as api from "../../server/api";

import { Redirect } from "react-router-dom";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isAuthenticated: false
    };
  }

  componentDidMount() {
    //check if user session exits just redirect the user to checkout
    const isAuthenticated = _.get(
      JSON.parse(sessionStorage.getItem("userAuth")),
      "isAuthenticated",
      false
    );
    this.setState({ isAuthenticated });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // handle authentication part
        api
          .authenticate(values)
          .then(response => {
            // save the token in the store
            this.props.setToken(response);
            // set the token and user details in localStorage
            sessionStorage.setItem(
              "userAuth",
              JSON.stringify({ ...response, isAuthenticated: true })
            );
            this.setState({ isAuthenticated: true });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isAuthenticated } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/checkout" />;
    }

    return (
      <FormWrapper onSubmit={this.handleSubmit}>
        <FormItemWrapper>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please enter username" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
            />
          )}
        </FormItemWrapper>
        <FormItemWrapper>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            />
          )}
        </FormItemWrapper>
        <FormItemWrapper>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </FormItemWrapper>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, actions)(Form.create()(Login));
