import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
// import { persistentStore } from "redux-pouchdb";
import { persistentStore } from "redux-pouchdb-plus";
import PouchDB from "pouchdb";
import axios from "axios";
import reducers from "../reducers";
import config from "../config";

// console.log('config.isClientSide', config.isClientSide);

/**
 * Logs all actions and states after they are dispatched.
 */
// const logger = store => next => action => {
//   console.group(action.type);
//   // console.info('dispatching', action)
//   let result = next(action);
//   // console.log('next state', store.getState())
//   console.groupEnd(action.type);
//   return result;
// };

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

export default (req, options = {}) => {
  /**
   * Receiving options
   */
  const {
    // isProduction,
    showLoggers,
    DBName,
    couchDBUrlConnector
  } = options;

  /**
   * Logging redux
   * */
  let { loggerOptions } = options;
  if (showLoggers !== undefined) {
    loggerOptions = { ...loggerOptions, predicate: () => showLoggers };
  }
  const loggerMiddleware = createLogger(loggerOptions);

  /**
   * Persistence store
   */
  const db = new PouchDB(DBName);
  let persistentStoreObject = () => initialState;
  persistentStoreObject = persistentStore(db, data => {
    console.log("1111111111111 data", data);
  });
  if (DBName && couchDBUrlConnector) {
    const sync = PouchDB.sync(DBName, couchDBUrlConnector, {
      live: true,
      retry: true
    })
      .on("change", info => {
        // handle change
        console.log("%POUNCH%  change", info);
      })
      .on("paused", err => {
        // replication paused (e.g. replication up to date, user went offline)
        console.log("%POUNCH%  paused", err);
      })
      .on("active", () => {
        // replicate resumed (e.g. new changes replicating, user went back online)
        console.log("%POUNCH%  active");
      })
      .on("denied", err => {
        // a document failed to replicate (e.g. due to permissions)
        console.log("%POUNCH%  denied", err);
      })
      .on("complete", info => {
        // handle complete
        console.log("%POUNCH%  complete", info);
      })
      .on("error", err => {
        // handle error
        console.log("%POUNCH%  error", err);
      });

    // // redux-pouchdb
    // persistentStoreObject = persistentStore(db, data => {
    //   console.log("%POUNCH%  data", data);
    //   return null;
    // });
    // example for persistentStore, but works the same for persistentReducer function.
    persistentStoreObject = persistentStore({ db });
  }

  /**
   * Axios config
   */
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

  /**
   * Store config
   */
  let initialState = {};
  console.log("### initialState", initialState);
  // if (config.isClientSide) {
  //   initialState = window.INITIAL_STATE || {};
  // }
  /*
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        readyStatePromise,
        loggerMiddleware,
        thunk.withExtraArgument(axiosInstance)
      ),
      // persistentStoreObject,
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
*/

  const applyMiddlewares = applyMiddleware(
    readyStatePromise,
    loggerMiddleware,
    thunk.withExtraArgument(axiosInstance)
  );

  const createStoreWithMiddleware = compose(
    applyMiddlewares,
    persistentStoreObject
  )(createStore);

  const store = createStoreWithMiddleware(reducers, initialState);

  return store;
};
