import React, { Component } from 'react';
import gql from "graphql-tag";
import { withApollo} from "react-apollo";
import { Redirect } from 'react-router-dom';

import Form from '../form';

class Login extends Component {

	loginFormSubmit = async (username, password) => {
    const LOGIN_MUTATION = gql`
      mutation AuthPayload($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            id
            name
            email
          }
        }
      }
    `;

    const auth = await this.props.client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email: username, password: password }
    });

    if (auth.data && auth.data.login) {
      window.localStorage.setItem('auth', JSON.stringify(auth.data.login));
      this.props.history.push(``)
    }
  };

  createFormSubmit = async (username, password) => {
    const SIGNUP_MUTATION = gql`
      mutation AuthPayload($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
          token
          user {
            id
            name
            email
          }
        }
      }
    `;

    const auth = await this.props.client.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { email: username, password: password }
    });

    if (auth.data && auth.data.signup) {
      window.localStorage.setItem('auth', JSON.stringify(auth.data.signup));
      this.props.history.push(``)
    }
  };

  render() {
    return (
      <React.Fragment>
        <Form title={'Login'} field1={'username'} field2={'password'} submit={this.loginFormSubmit}/>
        <Form title={'Create Account'} field1={'username'} field2={'password'} submit={this.createFormSubmit}/>
      </React.Fragment>
    )
  }
};

export default withApollo(Login);