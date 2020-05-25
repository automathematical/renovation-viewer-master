import React, { Component } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  Col,
  CardBody,
  Container,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getProjectimages,
  getProjectimage,
  deleteProjectimage,
} from "../../redux/actions/projectImageActions";
import { getProject } from "../../redux/actions/projectActions";
import { Link } from "react-router-dom";

class ProjectImages extends Component {
  static propTypes = {
    getProjectimages: PropTypes.func.isRequired,
    getProject: PropTypes.func,
    project: PropTypes.object,
    projectimage: PropTypes.object,
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    // console.log("params:" + JSON.stringify(this.props));
    // console.log("params:" + this.props);
    this.props.getProjectimages();
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

  onDeleteClick = (id) => {
    this.props.deleteProjectimage(id);
  };

  onClickPass = (pass) => {
    this.props.getProjectimage(pass);
  };

  render() {
    const { projectimages } = this.props.projectimage;
    const projectID = this.props.project.projects[0]._id;
    return (
      <div>
        <h1>projectimages</h1>
        {projectimages
          .filter((projectImage) => projectImage.project_id === projectID)
          .map(({ _id, project_id, images }) => (
            <div key={_id}>
              <Container style={{ width: "40%" }}>
                <Col>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src={this.convertToImage(images)}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle style={{ fontWeight: "bold" }}>
                        {project_id}
                      </CardTitle>
                      {this.props.isAuthenticated ? (
                        <Button
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          X Delete Image
                        </Button>
                      ) : null}
                      <Link to={`/DamagePage/${_id}`}>
                        <Button
                          color="warning"
                          size="sm"
                          onClick={this.onClickPass.bind(this, _id)}
                        >
                          + Report Damage
                        </Button>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              </Container>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projectimage: state.projectimage,
  project: state.project,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getProject,
  getProjectimage,
  getProjectimages,
  deleteProjectimage,
})(ProjectImages);
