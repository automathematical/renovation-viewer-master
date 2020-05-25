import axios from "axios";
import {
  GET_ANNOTATIONS,
  GET_ANNOTATION,
  ADD_ANNOTATION,
  DELETE_ANNOTATION,
  ANNOTATION_LOADING,
} from "./types";
import { returnErrors } from "./errorAction";

export const getAnnotations = () => (dispatch) => {
  dispatch(setAnnotationsLoading());
  axios
    .get("api/annotations")
    .then((res) =>
      dispatch({
        type: GET_ANNOTATIONS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getAnnotation = (id) => (dispatch) => {
  dispatch(setAnnotationsLoading());
  axios
    .get(`../../api/annotations/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ANNOTATION,
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

export const addAnnotation = (annotation) => (dispatch, getState) => {
  axios
    .post("../../api/annotations", annotation)
    .then((res) => {
      console.log(res);
      dispatch({
        type: ADD_ANNOTATION,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteAnnotation = (id) => (dispatch, getState) => {
  axios
    .delete(`../../api/annotations/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_ANNOTATION,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setAnnotationsLoading = () => {
  return {
    type: ANNOTATION_LOADING,
  };
};
