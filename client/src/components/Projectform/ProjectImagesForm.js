import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProject } from "../../redux/actions/projectActions";

const axios = require("axios");

class ProjectimagesForm extends Component {
  static propTypes = {
    //getProject: PropTypes.func.isRequired,
    project: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  componentDidMount() {
    this.props.getProject();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    // write the input to the state on change
    if (e.target.name !== "file") {
      const key = e.target.name;
      this.setState({ [key]: e.target.value });
    } else {
      this.setState({ file: e.target.files[0] });
    }

    // alternatively, you can write a function that retrieves all the data from the html document during an 'onSubmit' event. Then all the code goes in the 'submitForm' function.
  };

  submitForm = (e) => {
    e.preventDefault();

    // first, we upload the basic project properties, conforming to the mongoose model of the middleware API (see https://github.ugent.be/jmauwerb/Building_Informatics/tree/master/express_api_mongodb)
    const projectimage = {
      project_id: this.props.project.projects[0]._id,
    };

    // if this does not work, you'll need to install a CORS enabler in your browser (as a chrome or firefox extension). Then you should enable cross-origin-resource-sharing.
    axios
      .post("http://localhost:3000/api/projectimages", projectimage)
      .then((response) => {
        console.log("created", response.data);
        // this means the project was succesfully created.

        // Say we also have an image that we want to link to this project.
        // Due to the structure of our API at localhost 5000, we cannot link an image immediately to the project.
        // However, we can link it now with a POST request using formDATA.
        if (this.state.file) {
          //get the project id of the project you just created
          const projectImageId = response.data._id;

          // create the formData body
          const formData = new FormData();
          formData.append("file", this.state.file);

          // perform the actual request
          axios
            .post(
              `http://localhost:3000/api/projectimages/${projectImageId}/upload`,
              formData
            )
            .then((res) => console.log("res", res))
            .catch((error) => console.log("uploading Formdata", error));
        }
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div>
        <Button color="dark" size="sm" onClick={this.toggle}>
          + Add pictures
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Picture</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.submitForm}>
              <Label>project id is: {this.props.project.projects[0]._id}</Label>

              <FormGroup>
                <Label>Files</Label>
                <br />
                <Label>
                  <Input type="file" name="file" onChange={this.onChange} />
                </Label>
              </FormGroup>
              <Button color="dark" type="submit">
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProject })(ProjectimagesForm);
