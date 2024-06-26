const initialState = {
    isRoute: false
}

export const strictRouteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STRICT_ROUTE_SUCCESS':
            return {
                ...state,
                isRoute: true
            }
        case 'STRICT_ROUTE_FAIL':
            return {
                ...state,
                isRoute: false
            }
        default:
            return state;
    }
}