import axios from "axios";
import {
  GET_PROJECTS,
  GET_PROJECT,
  ADD_PROJECT,
  DELETE_PROJECT,
  PROJECTS_LOADING,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorAction";

export const getProjects = () => (dispatch) => {
  dispatch(setProjectsLoading());
  axios
    .get("api/projects")
    .then((res) =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getProject = (id) => (dispatch) => {
  dispatch(setProjectsLoading());
  axios
    .get(`/api/projects/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROJECT,
        payload: id,
      })
    )
    .catch((err) => {
      if (err.status === 404) {
        dispatch(returnErrors(err.response.data, err.response.status));
      } else {
        //return "error";
      }
    });
};

export const addProject = (project) => (dispatch, getState) => {
  axios
    .post("/api/projects", project, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_PROJECT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteProject = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/projects/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_PROJECT,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};
