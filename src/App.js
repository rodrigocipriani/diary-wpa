import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Reboot from "material-ui/Reboot";
import { Provider } from "react-redux";
import HabitList from "./Habit/HabitList";
import createStore from "./helpers/createStore";
import { Offline, Online } from "react-detect-offline";
import Snackbar from "material-ui/Snackbar";
import { inSync } from "redux-pouchdb-plus";

const store = createStore(null, {
  showLoggers: false,
  DBName: "diary",
  couchDBUrlConnector:
    "https://rodrigocipriani:LQP1wqj9PQ@couchdb.cloudno.de/rodrigocipriani"
});

const App = () => (
  <Provider store={store}>
    <Router>
      {/* <Reboot /> */}
      <div>
        {/* {!inSync() ? (
          // do something if the reducer states and the database are in sync
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            onClose={this.handleClose}
            SnackbarContentProps={{
              "aria-describedby": "message-id"
            }}
            style={{ position: "relative" }}
            message={<span id="message-id">Sincronizando</span>}
          />
        ) : null} */}
        <Offline>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            onClose={this.handleClose}
            SnackbarContentProps={{
              "aria-describedby": "message-id"
            }}
            style={{ position: "relative" }}
            message={
              <span id="message-id">
                Você está trabalhando <strong>Offline</strong>. Mas pode ficar
                tranquilo ;)
                <br />
                Suas alterações serão enviadas quando ficar Online.
              </span>
            }
          />
        </Offline>
        <ul>
          <li>
            <Link to="/">Habits</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </Router>
  </Provider>
);

const Home = () => {
  return (
    <div>
      <h2>Habits</h2>
      <HabitList />
    </div>
  );
};

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default App;
