
const strictRouteSuccess = data => {
    return {
        type: 'STRICT_ROUTE_SUCCESS',
        data
    }

}

const strictRouteFail = error => {
    return {
        type: 'STRICT_ROUTE_FAIL',
        error
    }
}

export const strictRouteAction = (isRoute) => {
    return async (dispatch) => {
        if (isRoute) {
            dispatch(strictRouteSuccess(true))

        } else {
            dispatch(strictRouteFail(false))

        }
    }
}