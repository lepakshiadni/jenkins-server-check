//EmployerReducer

const initialState = {
    trainerCreatePostDetails: {

    },
    trainerPostDetails: {},
    postTrainingComments: {

    },
    addlikePostTraning: {

    },
    getTrainingComments: {

    },
    postJobDetails: {

    },

    message: '',
    success: null

}

const trainerCreatePostReducer = (state = initialState, action) => {
    switch (action.type) {
        // post trainingRequirement  case
        case 'TRAINERCREATEPOST_SUCCESS':
            return {
                ...state,
                trainerCreatePostDetails: action.payload,
                message: action.payload.message,
                success: action.payload.success
            };
        case 'TRAINERCREATEPOST_FAILURE':
            return {
                ...state,
                message: action.payload.error
            };
        case 'GET_TRAINERCREATEPOST_SUCCESS':
            return {
                ...state,
                trainerCreatePostDetails: action.payload,
                message: action.payload.message,
                success: action.payload.success
            };
        case 'GET_TRAINERCREATEPOST_FAILURE':
            return {
                ...state,
                message: action.payload.error
            };
        case 'GET_TRAINERPOST_SUCCESS':
            return {
                ...state,
                trainerCreatePostDetails: action.payload,
                message: action.payload.message,
                success: action.payload.success
            };
        case 'GET_TRAINERPOST_FAILURE':
            return {
                ...state,
                message: action.payload.error
            };
        case 'ADD_POSTTRAININGCOMMENTS_SUCCESS':
            return {
                ...state,
                trainerCreatePostDetails: action.payload,
                message: action.payload.message,
                success: action.payload.success
            };
        case 'ADD_POSTTRAININGCOMMENTS_FAILURE':
            return {
                ...state,
                message: action.payload.error
            };
        case 'GET_TRAININGCOMMENTS_SUCCESS':
            return {
                ...state,
                trainerCreatePostDetails: action.payload,
                message: action.payload.message,
                success: action.payload.success
            };
        case 'GET_TRAININGCOMMENTS_FAILURE':
            return {
                ...state,
                message: action.payload.error
            };
        case 'DELETE_COMMENT_SUCCESS':
            return {
                ...state,
                trainerCreatePostDetails: action.payload,
                message: action.payload.message,
                success: action.payload.success
            };
        case 'DELETE_COMMENT_FAILURE':
            return {
                ...state,
                message: action.payload.error
            };
        case 'ADD_LIKEPOSTTRAINING_SUCCESS':
            return {
                ...state,
                trainerCreatePostDetails: action.payload,
                message: action.payload.message,
                success: action.payload.success
            };
        case 'ADD_LIKEPOSTTRAINING_FAILURE':
            return {
                ...state,
                message: action.payload.error
            };
        case 'ADD_BOOKMARKPOSTTRAINING_SUCCESS':
            return {
                ...state,
                trainerCreatePostDetails: action.payload,
                message: action.payload.message,
                success: action.payload.success
            };
        case 'ADD_BOOKMARKPOSTTRAINING_FAILURE':
            return {
                ...state,
                message: action.payload.error
            };
        case 'ADD_HIDEPOST_SUCCESS':
            return {
                ...state,
                trainerCreatePostDetails: action.payload,
                message: action.payload.message,
                success: action.payload.success
            };
        case 'ADD_HIDEPOST_FAILURE':
            return {
                ...state,
                message: action.payload.error
            };

        case 'DELETE_POSTBYID_SUCCESS':
            return {
                ...state,
                trainerCreatePostDetails: action.payload,
                message: action.payload.message,
                success: action.payload.success
            };
        case 'DELETE_POSTBYID_FAILURE':
            return {
                ...state,
                message: action.payload.error
            };

        default:
            return state;
    }
};




export { trainerCreatePostReducer }