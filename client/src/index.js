import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  createHttpLink,
  gql
} from "@apollo/client";
import {retreiveToken}from './utils/auth'
import { setContext } from '@apollo/client/link/context';
import {StoreProvider} from './store/store';
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = retreiveToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions:{
    watchQuery:{
      fetchPolicy:'no-cache'
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </StoreProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

