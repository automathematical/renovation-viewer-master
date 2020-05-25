import "./Aboutpage.css";
import Nav from "../../Nav/Nav";
import React, { Component } from "react";
import Footer from "../../Footer/Footer";

class Aboutpage extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="about">
          <h1 className="about_title">Store your projects in the cloud</h1>
          <p className="about_text">
            Away with boring repetitive tasks like editing a word document with
            pictures. The renovation viewer web-application makes it easy to
            document the existing condition and potential damage cases of
            buildings. Make and store your renovation analysis report in a
            matter of seconds.
            <br /> <br /> Adding: <br /> <br /> - General description of the
            building and site <br /> - Upload pictures related to the building{" "}
            <br /> - Accessibility evaluation <br /> - Material inventory <br />{" "}
            - Structural evaluation <br /> - And much more <br /> <br /> After
            uploading the project with related pictures, you can map the damages
            to the pictures with the help of our damage-mapper. The
            damage-mapper creates a user-friendly interface which helps the user
            to display the damages in a “paint”-like application. It lets the
            user select a certain point or selection on the image and afterwards
            you can categorise the damage in a default or custom category. Edit
            and add additional pictures related to the damages to add more
            detail if needed. Document everything in the cloud to get a better
            overview of the project. Damages will be indicated by an interactive
            rectangle which are visible on the images. Options are provided like
            filtering out a specific category of damages to be handled. Typical
            problems such as crack openings could be monitored and documented
            for further analysis. <br /> <br /> When everything is documented,
            you can generate your report in your preferred text format as easy
            as a click of a mouse button.
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Aboutpage;
