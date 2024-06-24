import { combineReducers } from "redux";
import siginupreducer from "./siginup.reducer";
import loginreducer from "./login.reducer";
import { frienduserReducer } from "./friend.reducer";
import { roleSelection } from "./roleselection.reducer";
import { employerReducer } from "./employer.reducer";
import { trainerReducer } from "./trainer.reducer";
import { postRequirementReducer } from "./postRequirement.reducer";
import { trainerCreatePostReducer } from "./trainercreatepost.reducer"

const rootReducer = combineReducers({
  generateOTP: siginupreducer,
  verifyOTP: loginreducer,
  frienduser: frienduserReducer,
  roleSelection: roleSelection,
  employerSignUp: employerReducer,
  trainerSignUp: trainerReducer,
  postRequirement: postRequirementReducer,
  trainerCreatePost: trainerCreatePostReducer

});
export default rootReducer;
