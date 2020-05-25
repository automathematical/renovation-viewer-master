import React, { Component } from "react";
import Nav from "../../Nav/Nav";
import Footer from "../../Footer/Footer";
import DamageInfo from "./damageInfo";

export default class DamagePage extends Component {
  render() {
    return (
      <div>
        <Nav />
        <DamageInfo />
        <Footer />
      </div>
    );
  }
}
