const initalstate = {
    frienduser: {}
}

export const frienduserReducer = (state = initalstate, action) => {
    switch (action.type) {
        case 'GETUSER_SUCCESS':
            return {
                ...state,
                frienduser: action.payload
            }
        case 'GETUSER_FAILURE':
            return {
                ...state,
                frienduser: action.payload.err
            }
        default:
            return state;
    }
}