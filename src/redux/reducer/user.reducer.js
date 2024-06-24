const initalstate = {
    user: {}
}

export const userReducer = (state = initalstate, action) => {
    switch (action.type) {
        case 'GETUSER_SUCCESS':
            return {
                ...state,
                user: action.payload
            }
        case 'GETUSER_FAILURE':
            return {
                ...state,
                user: action.payload.err
            }
        default:
            return state;
    }
}