import {
  GET_PROJECTIMAGES,
  GET_PROJECTIMAGE,
  ADD_PROJECTIMAGE,
  DELETE_PROJECTIMAGE,
  PROJECTIMAGE_LOADING,
} from "../actions/types";

const initialState = {
  projectimage: {},
  projectimages: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTIMAGES:
      return {
        ...state,
        projectimages: action.payload,
        loading: false,
      };
    case GET_PROJECTIMAGE:
      return {
        ...state,
        projectimages: state.projectimages.filter(
          (projectimage) => projectimage._id === action.payload
        ),
      };
    case ADD_PROJECTIMAGE:
      return {
        ...state,
        projectimages: [action.payload, ...state.projectimages],
      };
    case DELETE_PROJECTIMAGE:
      return {
        ...state,
        projectimages: state.projectimages.filter(
          (projectimage) => projectimage._id !== action.payload
        ),
      };
    case PROJECTIMAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
