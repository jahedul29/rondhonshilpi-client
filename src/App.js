import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/components/Login/Login";
import Activation from "./components/Login/components/Activation/Activation";
import { Provider } from "react-redux";
import store from "./coreServices/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/activation">
            <Activation />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
