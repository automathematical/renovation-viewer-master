import React, { Component } from "react";
import Nav from "../../Nav/Nav";
import Footer from "../../Footer/Footer";
import Projectinfo from "./Projectinfo";

export default class Projectpage extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Projectinfo />
        <Footer />
      </div>
    );
  }
}
