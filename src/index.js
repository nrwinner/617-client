import ReactDOM from 'react-dom';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

// Apollo
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { appReducer } from './reducers'

const store = createStore(appReducer);

if (module.hot) {
    console.log("in module.hot");
    module.hot.accept( () => {
        const nextRootReducer = require('./reducers').default;
        store.replaceReducer(nextRootReducer)
    });
}



const root = document.getElementById('root');
const client = new ApolloClient({
    uri: "http://localhost:4000"
});

if (root) {
    ReactDOM.render(
        <Provider store={store}>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </Provider>
    , root);
} else {
    // error handling
    console.error('Where\'s your root element bruh?');
}
