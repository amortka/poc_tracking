import { applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import { makeRootReducer } from './main.store';
import { asyncDispatchMiddleware } from './middlewares';

const initialState = (window as any).___INITIAL_STATE__ || {};

export const store = configureStore(initialState);

function configureStore(initialState: any): any {
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  if (window && window.location && window.location.hostname === 'localhost') {
    const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    ReduxThunk,
    asyncDispatchMiddleware,
    // socketMiddleware,
    // This is where you add other middleware like redux-observable
  ];

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(makeRootReducer(), initialState, compose(applyMiddleware(...middleware), ...enhancers));

  if ((module as any).hot) {
    // Enable Webpack hot module replacement for reducers
    (module as any).hot.accept('./main.store', () => {
      const nextRootReducer = require('./main.store'); // eslint-disable-line global-require, @typescript-eslint/no-var-requires
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
