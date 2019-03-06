import React, { Component } from 'react';
import gql from "graphql-tag";
import { withApollo} from "react-apollo";
import { Redirect } from 'react-router-dom';

import Form from '../form';

class Submit extends Component {

	constructor(props) {
		super(props);

		this.state = {
			auth: JSON.parse(window.localStorage.getItem('auth'))
		}
	}

  createPost = async (title) => {
    const CREATE_POST_MUTATION = gql`
      mutation Post($title: String!, $userId: ID!) {
        createPost(title: $title, userId: $userId) {
          title
        }
      }
    `;

    await this.props.client.mutate({
      mutation: CREATE_POST_MUTATION,
      variables: { title: title, userId: this.state.auth.user.id }
    });

    this.props.history.push(``)
  };

  render() {
  	if (!this.state.auth) {
  		return (<Redirect to={''}/>)
  	}

    return (
      <React.Fragment>
        <Form title={'Create Post'} field1={'title'} field2={'text'} submit={this.createPost}/>
      </React.Fragment>
    )
  }
};

export default withApollo(Submit);