import ReactDOM from 'react-dom';
import * as React from 'react';
import App from './App';

import { api } from './routes';

// Apollo
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from "apollo-link-http";

// Redux
import { Provider } from 'react-redux';

// React-Cookie
import { CookiesProvider } from 'react-cookie';

import store from './store';

if (module.hot) {
    console.log("in module.hot");
    module.hot.accept( () => {
        const nextRootReducer = require('./reducers').default;
        store.replaceReducer(nextRootReducer)
    });
}
const link = createHttpLink({uri: api, credentials: 'include'});

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});


const root = document.getElementById('root');

if (root) {
    ReactDOM.render(
        <CookiesProvider>
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </Provider>
        </ CookiesProvider>
    , root);
} else {
    // error handling
    console.error('Where\'s your root element bruh?');
}
