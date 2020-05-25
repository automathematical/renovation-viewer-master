import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjectimage } from "../../../redux/actions/projectImageActions";

import {
  getAnnotations,
  addAnnotation,
} from "../../../redux/actions/annotationActions";
import { Container, CardText } from "reactstrap";

import Annotation from "react-image-annotation";

class DamageInfo extends Component {
  static propTypes = {
    getProjectimage: PropTypes.func.isRequired,
    projectimage: PropTypes.object,
    getAnnotations: PropTypes.func,
    annotation: PropTypes.object,
  };

  state = {
    annotations: [],
    annotation: {},
  };

  componentDidMount() {
    this.props.getProjectimage();
  }

  convertToImage(buffer) {
    if (
      buffer !== undefined &&
      buffer.data !== undefined &&
      buffer.data !== ""
    ) {
      var base64Flag = "data:image/jpeg;base64,";
      var imageStr = this.arrayBufferToBase64(buffer.data);
      return base64Flag + imageStr;
    }
    return "";
  }

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  onChange = (annotation) => {
    this.setState({ annotation });
  };

  onSubmit = (annotation) => {
    const { selection, geometry, data } = annotation;

    const newAnnotation = { selection, geometry, data };
    console.log(newAnnotation);

    this.setState({
      annotation: {},
      annotations: this.state.annotations.concat({
        selection,
        geometry,
        data: {
          ...data,
          imageid: this.props.projectimage.projectimages[0]._id,
          id: Math.random(),
        },
      }),
    });

    this.props.addAnnotation(newAnnotation);
  };

  render() {
    const { projectimages } = this.props.projectimage;
    const { annotations } = this.props.annotation;
    // console.log("annotations " + this.props.annotation);
    return (
      <div>
        {projectimages
          // .filter((projectImage) => projectImage.project_id === )
          .map(({ _id, images }) => (
            <div key={_id}>
              <Container style={{ width: "60%" }}>
                <CardText>Annotation</CardText>
                <Annotation
                  src={this.convertToImage(images)}
                  alt={_id}
                  annotations={this.state.annotations}
                  type={this.state.type}
                  value={this.state.annotation}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  allowTouch
                />
              </Container>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projectimage: state.projectimage,
  annotation: state.annotation,
});

export default connect(mapStateToProps, {
  getProjectimage,
  getAnnotations,
  addAnnotation,
})(DamageInfo);
