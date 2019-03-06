import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from 'react-router-dom'

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      input: {
        value: ''
      },
      GET_POSTS: gql`
        query Post($title: String!) {
          posts(title: $title) {
            title
            author {
              name
            }
          }
        }
      `
    };
  }

  handleChange = (event) => {
    this.setState({
      input: {
        value: event.target.value
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { GET_POSTS, input } = this.state;
    const auth = window.localStorage.getItem('auth');

    return (
      <React.Fragment>
        <header>
          <div className='lhs'>
            <h1>Hacker News</h1>
            <form onSubmit={this.handleSubmit}>
              <input 
                type="text" 
                placeholder="Search Posts" 
                value={input.value}
                onChange={this.handleChange}/>
            </form>
            <Link to="/submit">Create Post</Link>
          </div>
          <div className='rhs'>
            {
              auth ? (
                <button onClick={() => {
                  window.localStorage.clear()
                  this.props.history.push(``)
                }}>Logout</button>
              ) : (
                <Link to="/login">Login</Link>
              )
            }
          </div>
        </header>
        <Query query={GET_POSTS} variables={{ title: input.value }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
              <React.Fragment>
                <div className='posts'>
                  {data.posts.map((post, i) => (
                      <div className='link' key={i}>
                        <div className='number'>{i}.</div>
                        <div className='about'>
                          <div className='title'>{post.title}</div>
                          <div className='name'>{post.author.name}</div>
                        </div>
                      </div>
                    ))}
                </div>

              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default Home;