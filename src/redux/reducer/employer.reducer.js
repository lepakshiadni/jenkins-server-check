//TrainerReducer

const initialState = {
  employerDetails: {},
  addBookMarkedPost: {},
  getAppliedTrainingEmployer: {},
  getAllAppliedTraining: {},
  addApplicationRequest: {},
  getAppCandidacy: {},
  newRequest: {},
  connections: {},
  requestedConnections: {},
  notification: {},
  skillData: {},
  message: "",
  success: null,
};

const employerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EMPLOYER_SIGNUP_SUCCESS":
      return {
        ...state,
        employerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "EMPLOYER_SIGNUP_FAILURE":
      return {
        ...state,
        message: action.payload.error,
      };

    //geting trainer details after signup
    case "GET_EMPLOYEEDETAILS_FETCHED":
      console.log("handling get employer");

      // toast.success(action.payload.message)
      return {
        ...state,
        employerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "UNAUTHORIZED":
      console.log("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    //updating the trainerProfile
    case "EMPLOYERBASICINFO_UPDATED_SUCCESS":
      console.log("handling get employer", action.payload);
      return {
        ...state,
        employerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "EMPLOYERBASICINFO_UPDATE_FAILURE":
      console.log("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "EMPLOYERPROFILE_IMAGE_UPDATE_SUCCESS":
      console.log("handling get employer");
      return {
        ...state,
        employerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "EMPLOYERPROFILE_IMAGE_UPDATE_FAILURE":
      console.log("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "EMPLOYERPROFILE_BANNER_UPDATE_SUCCESS":
      console.log("handling get employer");
      return {
        ...state,
        employerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "EMPLOYERPROFILE_BANNER_UPDATE_FAILURE":
      console.log("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "EMPLOYERSKILSSINFO_UPDATED_SUCCESS":
      console.log("handling get employer");
      return {
        ...state,
        employerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "EMPLOYERSKILSSINFO_UPDATE_FAILURE":
      console.log("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "EMPLOYERCONTACTINFO_UPDATED_SUCCESS":
      console.log("handling get employer");
      return {
        ...state,
        employerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "EMPLOYERCONTACTINFO_UPDATE_FAILURE":
      console.log("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "EMPLOYEREXPERIENCEINFO_UPDATED_SUCCESS":
      console.log("handling get employer");
      return {
        ...state,
        trainerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "EMPLOYEREXPERIENCEINFO_UPDATE_FAILURE":
      console.log("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case 'DELETE_EMPLOYER_EXPERIENCE_SUCCESS':
      return {
        ...state,
        employerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case 'DELETE_EMPLOYER_EXPERIENCE_FAILURE':
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
      console.log("handling get employer");
      return {
        ...state,
        addBookMarkedPost: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "ADD_BOOKMARKEDPOSTFAILURE":
      console.log("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "GET_BOOKMARKEDPOST_SUCCESS":
      console.log("handling get employer book marked", action.payload);
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
    case "APPLIEDTRAININGFECTED_SUCCESS":
      console.log("handling get employer appliedTraining", action.payload);
      return {
        ...state,
        getAppliedTrainingEmployer: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "APPLIEDTRAININGFECTED_FAILURE":
      // console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "ALLAPPLIEDTRAININGFECTED_SUCCESSS":
      // console.log("handling get employer appliedTraining", action.payload);
      return {
        ...state,
        getAllAppliedTraining: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "ALLAPPLIEDTRAININGFECTED_FAILURE":

      return {
        ...state,
        message: action.payload.error,
      };
    case "ACCEPTEDTRAININGFECTED_SUCCESSS":

      return {
        ...state,
        getAppliedTrainingEmployer: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "ACCEPTEDTRAININGFECTED_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "UPDATEDAPPLIEDSTATUS_SUCCESSS":
      console.log("handling update  appliedTraining", action.payload);
      return {
        ...state,
        getAppliedTrainingEmployer: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "UPDATEDAPPLIEDSTATUS_FAILURE":
      console.log("Handling failure trainer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "ADDFEEDBACK_SUCCESSS":
      console.log("handling add feedback", action.payload);
      return {
        ...state,
        getAllAppliedTraining: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "ADDFEEDBACK_FAILURE":
      console.log("Handling failure add feedback:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "ADD_APPLICATIONREQUEST_SUCCESS":
      console.log("handling add feedback", action.payload);
      return {
        ...state,
        addApplicationRequest: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "ADD_APPLICATIONREQUEST_FAILURE":
      console.log("Handling failure add feedback:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "GET_ALLCANDIDACY_SUCCESS":
      console.log("handling add feedback", action.payload);
      return {
        ...state,
        getAllCandidacy: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "GET_ALLCANDIDACY_FAILURE":
      console.log("Handling failure add feedback:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "EMPLOYERPHONE_UPDATED_SUCCESS":
      console.log("handling get employer");
      return {
        ...state,
        employerDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "EMPLOYERPHONE_UPDATE_FAILURE":
      console.log("Handling failure employer:", action.payload);
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


    default:
      return state;
  }
};

export { employerReducer };
