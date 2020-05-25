import axios from "axios";
import {
  GET_PROJECTIMAGES,
  GET_PROJECTIMAGE,
  ADD_PROJECTIMAGE,
  DELETE_PROJECTIMAGE,
  PROJECTIMAGE_LOADING,
} from "./types";
import { returnErrors } from "./errorAction";

export const getProjectimages = () => (dispatch) => {
  dispatch(setProjectimagesLoading());
  axios
    .get("../../api/projectimages")
    .then((res) =>
      dispatch({
        type: GET_PROJECTIMAGES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getProjectimage = (id) => (dispatch) => {
  dispatch(setProjectimagesLoading());
  axios
    .get(`../../api/projectimages/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROJECTIMAGE,
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

export const addProjectimage = (projectimage) => (dispatch, getState) => {
  axios
    .post("../../api/projectimages", projectimage)
    .then((res) =>
      dispatch({
        type: ADD_PROJECTIMAGE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteProjectimage = (id) => (dispatch, getState) => {
  axios
    .delete(`../../api/projectimages/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_PROJECTIMAGE,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setProjectimagesLoading = () => {
  return {
    type: PROJECTIMAGE_LOADING,
  };
};
