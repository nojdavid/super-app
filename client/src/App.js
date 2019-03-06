import React, { Component } from 'react';
import './App.css';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from 'react-router'; 

import Home from './components/home';
import Login from './components/login';
import Submit from './components/submit';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      client: new ApolloClient({
        uri: "http://localhost:4000"
      })
    }

    this.state.client
      .query({
        query: gql`
          {
            posts(title: "Join") {
              id
              title
              author {
                id
                name
              }
            }
          }
        `
      })
      .then(result => console.log('apollo working',result));
  }

  render() {
    const { client } = this.state;
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className='content'>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/submit" exact component={Submit} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App;
