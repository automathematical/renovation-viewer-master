import {
  GET_ANNOTATIONS,
  GET_ANNOTATION,
  ADD_ANNOTATION,
  DELETE_ANNOTATION,
  ANNOTATION_LOADING,
} from "../actions/types";

const initialState = {
  annotations: {},
  annotation: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ANNOTATIONS:
      return {
        ...state,
        annotations: action.payload,
        loading: false,
      };
    case GET_ANNOTATION:
      return {
        ...state,
        annotations: state.annotation.filter(
          (annotation) => annotation._id === action.payload
        ),
      };
    case ADD_ANNOTATION:
      return {
        ...state,
        annotations: [action.payload, ...state.annotations],
      };
    case DELETE_ANNOTATION:
      return {
        ...state,
        annotations: state.annotations.filter(
          (annotation) => annotation._id !== action.payload
        ),
      };
    case ANNOTATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
