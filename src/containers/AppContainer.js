import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import fetchObjects from "../utils/fetchObjects";
import EditCartItem from "../components/EditCartItem";
import CartItems from "../components/CartItems";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: "Hylete Custom Objects Demo",
      customObjects: []
    };
  }

  componentDidMount() {
    fetchObjects().then(res => {
      this.setState({ customObjects: [...res] });
    });
  }

  render() {
    const { project, customObjects } = this.state;
    return (
      <div>
        <Router>
          <Header name={project} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <CartItems {...props} customObjects={customObjects} />
              )}
            ></Route>
            <Route
              exact
              path="/object/edit/:id"
              component={EditCartItem}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default AppContainer;
