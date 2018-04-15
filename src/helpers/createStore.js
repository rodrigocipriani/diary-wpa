import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import reducers from "../reducers";
import config from "../config";

// console.log('config.isClientSide', config.isClientSide);

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  console.group(action.type);
  // console.info('dispatching', action)
  let result = next(action);
  // console.log('next state', store.getState())
  console.groupEnd(action.type);
  return result;
};

/**
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 */
const readyStatePromise = store => next => action => {
  // console.log(':::', action);
  if (!action.promise) {
    return next(action);
  }

  function makeAction(ready, data) {
    const newAction = Object.assign({}, action, { ready }, data);
    delete newAction.promise;
    return newAction;
  }

  next(makeAction(false));
  return action.promise.then(
    result => next(makeAction(true, { payload: result })),
    error => next(makeAction(true, { error }))
  );
};

export default req => {
  let headers = {};
  if (req) {
    headers = {
      cookie: req ? req.get("cookie") || "" : ""
    };
  }
  // console.log('1111111111111111111111111', `${config.appUrl}/api`);
  const axiosInstance = axios.create({
    baseURL: `${config.publicUrl}/api`,
    headers,
    withCredentials: true
  });

  axiosInstance.interceptors.request.use(
    request => request,
    error => {
      error.message = "Fail on send data.";
      console.error(error.message, error, error.request);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const response = error.response;
      error.message =
        response && response.data ? response.data.message : "Fail on get data.";
      console.error(error.message, error, error.response);
      return Promise.reject(error);
    }
  );

  let initialState = {};
  // if (config.isClientSide) {
  //   initialState = window.INITIAL_STATE || {};
  // }
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(
      readyStatePromise,
      logger,
      thunk.withExtraArgument(axiosInstance)
    )
  );

  return store;
};