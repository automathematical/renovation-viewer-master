import React, { Component } from "react";
import Nav from "../../Nav/Nav";
import Projects from "../../Projects/Projects";
import Footer from "../../Footer/Footer";

export default class StartPage extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Projects />
        <Footer />
      </div>
    );
  }
}
