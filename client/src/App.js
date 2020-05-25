import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./redux/actions/authActions";

import Startpage from "./components/pages/startpage/Startpage";
import Projectpage from "./components/pages/projectpage/Projectpage";
import Aboutpage from "./components/pages/aboutpage/Aboutpage";
import Contactpage from "./components/pages/contactpage/Contactpage";
import DamagePage from "./components/pages/damagePage/DamagePage";

import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Startpage} />
            <Route exact path="/Projectpage/:id" component={Projectpage} />
            <Route exact path="/DamagePage/:id" component={DamagePage} />
            <Route exact path="/Aboutpage" component={Aboutpage} />
            <Route exact path="/Contactpage" component={Contactpage} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
