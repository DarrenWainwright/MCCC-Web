import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';
import Home from './components/Home';
import reducer from './reducers/sensorListReducer';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(reducer, applyMiddleware(...middleware));

render(
    <Provider store={store}>
       <Home />
    </Provider>,
    rootElement);



//<BrowserRouter basename={baseUrl}>
//    <App />
//</BrowserRouter>