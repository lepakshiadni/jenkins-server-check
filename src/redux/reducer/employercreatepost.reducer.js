const initialState = {
    employerPostDetails: {},
    success: null,
    message: ''
}


const employerCreatePostReducer = (state = initialState, action) => { 
    switch (action?.type) {
        case 'EMPLOYERCREATEPOST_SUCCESS':
            return {
                ...state,
                employerPostDetails: action?.payload?.employerCreatePostDetails,
                success: action?.payload?.success,
                message: 'Post Created Successfully'
            }
        case 'EMPLOYERCREATEPOST_FAILURE':
            return {
                ...state,
                employerPostDetails: action?.payload,
                success: action?.payload?.success,
                message: action?.payload?.message
            }
        default:
            return state;
    }
}


export { employerCreatePostReducer }