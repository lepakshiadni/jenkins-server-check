import { toast } from "react-toastify";
//TrainerReducer

const initialState = {
  trainerDetails: {},
  addBookMarkedPost: {},
  trainerAppliedTraining: {},
  gettrainerAppliedTraining: {},
  getAllRequestTraining: {},
  skillData: {},
  newRequest: {},
  connections: {},
  requestedConnections: {},
  notification: {},
  // deleteAppliedTraining:{},
  message: "",
  success: null,
};

const trainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TRAINER_SIGNUP_SUCCESS":
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "TRAINER_SIGNUP_FAILURE":
      return {
        ...state,
        message: action.payload.error,
      };

    //geting trainer details after signup
    case "GET_TRAINERDETAILS_FETCHED":
      console.log("handling get trainer");
      // toast.success(action.payload.message)
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "UNAUTHORIZED":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    //updating the trainerProfile
    case "TRAINERBASICINFO_UPDATED_SUCCESS":
      console.log("Trainer basic info update");
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "TRAINERBASICINFO_UPDATE_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "TRAINERPROFILE_IMAGE_UPDATE_SUCCESS":
      // console.log("handling get trainer");
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "TRAINERPROFILE_IMAGE_UPDATE_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "TRAINERPROFILE_BANNER_UPDATE_SUCCESS":
      // console.log("handling get trainer");
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "TRAINERPROFILE_BANNER_UPDATE_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };

    case "TRAINERSKILSSINFO_UPDATED_SUCCESS":
      console.log("handling get trainer");
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "TRAINERSKILSSINFO_UPDATE_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case 'UPDATE_ALLRATING_SUCCESS':
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case 'UPDATE_ALLRATING_FAILURE':
      return {
        ...state,
        message: action.payload.error,
      };
    case "TRAINERCERTIFICATEINFO_UPDATED_SUCCESS":
      console.log("handling get trainer");
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "TRAINERCERTIFICATEINFO_UPDATE_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "DELETE_TRAINER_CERTIFICATE_SUCCESS":
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "DELETE_TRAINER_CERTIFICATE_FAILURE":
      return {
        ...state,
        message: action.payload.error,
      };
    case "TRAINERCONTACTINFO_UPDATED_SUCCESS":
      console.log("handling get trainer");
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "TRAINERCONTACTINFO_UPDATE_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "TRAINEREXPERIENCEINFO_UPDATED_SUCCESS":
      console.log("handling get trainer");
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "TRAINEREXPERIENCEINFO_UPDATE_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case 'GET_SKILLDATA_SUCCESS':

      return {
        ...state,
        skillData: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case 'GET_SKILLDATA_FAILURE':
      return {
        ...state,
        message: action.payload.error,
      };


    //add to the bookmark the trainerProfile
    case "ADD_BOOKMARKEDPOST_SUCCESS":
      console.log("handling get trainer");
      return {
        ...state,
        addBookMarkedPost: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "ADD_BOOKMARKEDPOSTFAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "GET_BOOKMARKEDPOST_SUCCESS":
      console.log("handling get trainer book marked", action.payload);
      return {
        ...state,
        addBookMarkedPost: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "GET_BOOKMARKEDPOST_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "POST_TRAINERAPPLIEDTRAINING_SUCCESS":
      console.log("handling post trainer applied trainer", action.payload);
      return {
        ...state,
        trainerAppliedTraining: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "POST_TRAINERAPPLIEDTRAINING_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload,
        success: action.payload,
      };
    case "GET_APPLIEDTRAINING_SUCCESS":
      console.log("handling get trainer APPLIED TRAINING", action.payload);
      return {
        ...state,
        gettrainerAppliedTraining: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "GET_APPLIEDTRAINING_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "APPLIEDTRAININGDELETED_SUCCESS":
      console.log("handling get trainer APPLIED TRAINING", action.payload);
      return {
        ...state,
        gettrainerAppliedTraining: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "APPLIEDTRAININGDELETED_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "ADD_TRAINING_RESOURCES_SUCCESS":
      console.log("handling add resource file action", action.payload);
      return {
        ...state,
        gettrainerAppliedTraining: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "ADD_TRAINING_RESOURCES_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "GET_ALLREQUEST_SUCCESS":
      console.log("handling add resource file action", action.payload);
      return {
        ...state,
        getAllRequestTraining: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "GET_ALLREQUEST_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "CONVERSATIONCREATED_SUCCESS":
      console.log("handling add resource file action", action.payload);
      return {
        ...state,
        newRequest: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "CONVERSATIONCREATED_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "GET_AllREQUEST_SUCCESS":
      console.log("handling add resource file action", action.payload);
      return {
        ...state,
        requestedConnections: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "GET_AllREQUEST_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };

    case "GET_CONVERSATIONCREATED_SUCCESS":
      console.log("handling get connections", action.payload);
      return {
        ...state,
        connections: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "GET_CONVERSATIONCREATED_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };

    case "GET_CONVERSATIONREQUEST_SUCCESS":
      console.log("handling get conversation sccue", action.payload);
      return {
        ...state,
        newRequest: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "GET_CONVERSATIONREQUEST_FAILURE":
      console.log("Handling failure get conversation :", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "ACCEPT_CONVERSATIONREQUEST_SUCCESS":
      console.log("handling get conversation sccue", action.payload);
      return {
        ...state,
        newRequest: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "ACCEPT_CONVERSATIONREQUEST_FAILURE":
      console.log("Handling failure get conversation :", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "Decline_CONVERSATIONREQUEST_SUCCESS":
      console.log("handling get conversation sccue", action.payload);
      return {
        ...state,
        newRequest: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "Decline_CONVERSATIONREQUEST_FAILURE":
      console.log("Handling failure get conversation :", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };

    case "REMOVE_CONNECTION_SUCCESS":
      console.log("handling get conversation sccue", action.payload);
      return {
        ...state,
        newRequest: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "REMOVE_CONNECTION_FAILURE":
      console.log("Handling failure get conversation :", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };

    case "UPDATEDAPPLIEDSTATUS_SUCCESSS":
      console.log("handling add resource file action", action.payload);
      return {
        ...state,
        getAllRequestTraining: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "UPDATEDAPPLIEDSTATUS_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "TRAINERPHONE_UPDATED_SUCCESS":
      console.log("handling add resource file action", action.payload);
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "TRAINERPHONE_UPDATE_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "GET_ALL_NOTIFICATION_SUCCESS":
      console.log("handling add resource file action", action.payload);
      return {
        ...state,
        notification: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "GET_ALL_NOTIFICATION_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "READ_NOTIFICATION_SUCCESS":
      console.log("handling add resource file action", action.payload);
      return {
        ...state,
        notification: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "READ_NOTIFICATION_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "DELETEALL_NOTIFICATION_SUCCESS":
      console.log("handling add resource file action", action.payload);
      return {
        ...state,
        notification: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "DELETEALL_NOTIFICATION_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    default:
      return state;
  }
};

export { trainerReducer };
