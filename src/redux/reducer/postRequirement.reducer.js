//EmployerReducer

const initialState = {
  postTrainingDetails: {},
  postTrainingComments: {},
  addlikePostTraning: {},
  getTrainingComments: {},
  postJobDetails: {},
  getAllTrainingDetails: {},
  message: "",
  success: null,
};

const postRequirementReducer = (state = initialState, action) => {
  switch (action.type) {
    // post trainingRequirement  case
    case "POST_TRAININGREQUIREMENT_SUCCESS":
      console.log("Handling success:", action.payload);
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "POST_TRAININGREQUIREMENT_FAILURE":
      console.error("Handling failure:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    //geting employer posttraing details
    case "GET_TRAININGREQUIREMENTS_SUCCESS":
      console.log("handling get post traiing");
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "GET_TRAININGREQUIREMENTS_FAILURE":
      // console.error("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload,
      };
    case "GETALL_TRAININGREQUIREMENTS_SUCCESS":
      console.log("handling get post traiing");
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "GETALL_TRAININGREQUIREMENTS_FAILURE":
      // console.error("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload,
      };
    case "POSTDELETED_SUCCESS":
      console.log("handling delete post traiing");
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "POSTDELETED_FAILURE":
      // console.error("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload,
      };
    //post employer post job requiement
    case "POST_JOBREQUIREMENTS_SUCCESS":
      console.log("handling get postjob");
      return {
        ...state,
        postJobDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "POST_JOBREQUIREMENTS_FAILURE":
      console.error("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "GET_JOBREQUIREMENTS_SUCCESS":
      console.log("handling get post traiing");
      return {
        ...state,
        postJobDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "GET_JOBREQUIREMENTS_FAILURE":
      console.error("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "ADD_POSTTRAININGCOMMENTS_SUCCESS":
      console.log("handling add post traiing comments");
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "ADD_POSTTRAININGCOMMENTS_FAILURE":
      console.error("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "ADD_LIKEPOSTTRAINING_SUCCESS":
      console.log("handling add post traiing comments");
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "ADD_LIKEPOSTTRAINING_FAILURE":
      console.error("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "ADD_BOOKMARKPOSTTRAINING_SUCCESS":
      console.log("handling add post traiing comments");
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "ADD_BOOKMARKPOSTTRAINING_FAILURE":
      console.error("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case "GET_TRAININGCOMMENTS_SUCCESS":
      console.log("handling add post traiing comments");
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success,
      };
    case "GET_TRAININGCOMMENTS_FAILURE":
      console.error("Handling failure employer:", action.payload);
      return {
        ...state,
        message: action.payload.error,
      };
    case 'DELETE_COMMENT_SUCCESS':
      console.log("Handling success:", action.payload);
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success
      };
    case 'DELETE_COMMENT_FAILURE':
      console.log("Handling failure:", action.payload);
      return {
        ...state,
        message: action.payload.error
      };
    case 'ADD_HIDEPOST_SUCCESS':
      console.log("Handling success:", action.payload);
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success
      };
    case 'ADD_HIDEPOST_FAILURE':
      console.log("Handling failure:", action.payload);
      return {
        ...state,
        message: action.payload.error
      };

    case 'UPDATE_EMPLOYER_POST_SUCCESS':
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success
      };
    case 'UPDATE_EMPLOYER_POST_FAILURE':
      return {
        ...state,
        message: action.payload.error
      };
    case 'UPDATE_APPLICAITONSTATUS_SUCCESS':
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success
      };
    case 'UPDATE_APPLICATIONSTATUS_FAILURE':
      return {
        ...state,
        message: action.payload.error
      };

    case 'UPDATE_ENABLESTATUS_SUCCESS':
      return {
        ...state,
        postTrainingDetails: action.payload,
        message: action.payload.message,
        success: action.payload.success
      };
    case 'UPDATE_ENABLESTATUS_FAILURE':
      return {
        ...state,
        message: action.payload.error
      };



    default:
      return state;
  }
};

export { postRequirementReducer };
