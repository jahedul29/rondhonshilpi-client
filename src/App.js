import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/components/Login/Login";
import Activation from "./components/Login/components/Activation/Activation";
import Registration from "./components/Login/components/Registration/Registration";

function App() {
  return (
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
  );
}

export default App;
