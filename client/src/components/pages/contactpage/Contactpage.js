import "./Contactpage.css";
import React, { Component } from "react";
import Nav from "../../Nav/Nav";
import Footer from "../../Footer/Footer";

class Contactpage extends Component {
  render() {
    // console.log("my message", this.props.message)
    return (
      <div>
        <Nav />

        <div className="contacts">
          <h1 className="contact_title"> Michael Matej Batelka</h1>
          <h1 className="contact_title"> Evelien Couvreur </h1>
          <h1 className="contact_title"> Mathieu van Leemputten</h1>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Contactpage;
