import {
  GET_PROJECTS,
  GET_PROJECT,
  ADD_PROJECT,
  DELETE_PROJECT,
  PROJECTS_LOADING,
} from "../actions/types";

const initialState = {
  project: {},
  projects: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case GET_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id === action.payload
        ),
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
