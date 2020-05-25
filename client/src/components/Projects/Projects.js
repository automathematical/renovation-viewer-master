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
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getProjects,
  getProject,
  deleteProject,
} from "../../redux/actions/projectActions";

class Projects extends Component {
  static propTypes = {
    getProjects: PropTypes.func.isRequired,
    getProject: PropTypes.func.isRequired,
    project: PropTypes.object,
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    //console.log("params:" + JSON.stringify(this.props));
    this.props.getProjects();
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
    this.props.deleteProject(id);
  };

  onClickPass = (pass) => {
    console.log("passed " + pass);
    this.props.getProject(pass);
  };

  render() {
    const { projects } = this.props.project;
    return (
      <div className="projects">
        {projects.map(({ _id, title, location, description, image }) => (
          <div key={_id} className="project">
            <Container style={{ width: "40%" }}>
              <Col>
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src={this.convertToImage(image)}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle style={{ fontWeight: "bold" }}>
                      {title}
                    </CardTitle>
                    {this.props.isAuthenticated ? (
                      <Button
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        X Delete Project
                      </Button>
                    ) : null}
                    <Link to={`/ProjectPage/${_id}`}>
                      <Button
                        size="sm"
                        color="dark"
                        onClick={this.onClickPass.bind(this, _id)}
                      >
                        <b> Go to {title}</b>
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
  project: state.project,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getProject,
  getProjects,
  deleteProject,
})(Projects);
