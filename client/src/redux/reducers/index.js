import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import projectimageReducer from "./projectImageReducer";
import annotationReducer from "./annotationReducer";

export default combineReducers({
  project: projectReducer,
  error: errorReducer,
  auth: authReducer,
  projectimage: projectimageReducer,
  annotation: annotationReducer,
});
