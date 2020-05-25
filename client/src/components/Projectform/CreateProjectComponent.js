import React, { Component } from "react";
import {
  NavLink,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
} from "reactstrap";

const axios = require("axios");

export default class CreateProjectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: "",
      location: "",
      description: "",
    };
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
    const project = {
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
    };

    // if this does not work, you'll need to install a CORS enabler in your browser (as a chrome or firefox extension). Then you should enable cross-origin-resource-sharing.
    axios
      .post("http://localhost:3000/api/projects", project)
      .then((response) => {
        console.log("created", response.data);
        // this means the project was succesfully created.

        // Say we also have an image that we want to link to this project.
        // Due to the structure of our API at localhost 5000, we cannot link an image immediately to the project.
        // However, we can link it now with a POST request using formDATA.
        if (this.state.file) {
          //get the project id of the project you just created
          const projectId = response.data._id;

          // create the formData body
          const formData = new FormData();
          formData.append("file", this.state.file);

          // perform the actual request
          axios
            .post(
              `http://localhost:3000/api/projects/${projectId}/upload`,
              formData
            )
            .then((res) => console.log("res", res))
            .catch((error) => console.log("error uploading Formdata", error));
        }
      })
      .catch((error) => console.log("error", error));

    this.toggle();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Add Project
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Project</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.submitForm}>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Title of the project"
                onChange={this.onChange}
              />

              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="location of the project"
                onChange={this.onChange}
              />

              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Description of the project"
                onChange={this.onChange}
              />

              <FormGroup>
                <Label>File (optional) </Label>
                <br />
                <Label>
                  <Input type="file" name="file" onChange={this.onChange} />
                </Label>
              </FormGroup>

              <hr />
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
