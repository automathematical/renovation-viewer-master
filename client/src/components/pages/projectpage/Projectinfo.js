import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProject } from "../../../redux/actions/projectActions";
import ProjectimagesForm from "../../Projectform/ProjectImagesForm";
import ProjectImages from "../../ProjectImages/ProjectImages";

class ProjectInfo extends Component {
  static propTypes = {
    //getProject: PropTypes.func.isRequired,
    project: PropTypes.object,
  };

  componentDidMount() {
    this.props.getProject();
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

  render() {
    const { projects } = this.props.project;
    return (
      <div>
        {projects.map(({ _id, title, location, description, image }) => (
          <div key={_id} className="project">
            <Container style={{ width: "40%" }}>
              <Row>
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
                      <CardSubtitle>{location}</CardSubtitle>
                      <br />
                      <CardText>{description}</CardText>
                      <Row>{<ProjectimagesForm />}</Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
            {<ProjectImages />}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProject })(ProjectInfo);
