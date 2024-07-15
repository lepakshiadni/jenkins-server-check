import Axios from 'axios'
import Cookies from 'js-cookie'
const baseUrl = process.env.REACT_APP_API_URL;

export const postTrainingRequirementAction = (postTrainingDetails) => {
    // console.log(postTrainingDetails)
    const token = Cookies.get('token')
    console.log(token);
    return async (dispatch) => {
        await Axios.post(`${baseUrl}/employerpost/postTrainingRequirement`, postTrainingDetails, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((resp) => {
                dispatch({
                    type: 'POST_TRAININGREQUIREMENT_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "POST_TRAININGREQUIREMENT_FAILURE",
                    payload: error
                })
            })
    }
}

export const getPostTrainingRequirementAction = () => {
    const token = Cookies.get("token")
    return async (dispatch) => {
        await Axios.get(`${baseUrl}/employerpost/getpostTrainingRequirement`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => {
                dispatch({
                    type: 'GET_TRAININGREQUIREMENTS_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "GET_TRAININGREQUIREMENTS_FAILURE",
                    payload: error
                })
            })
    }
}

export const getAllPostTrainingRequirementAction = () => {

    return async (dispatch) => {
        await Axios.get(`${baseUrl}/employerpost/getAllPostTrainingRequirement`)
            .then((resp) => {
                dispatch({
                    type: 'GETALL_TRAININGREQUIREMENTS_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "GETALL_TRAININGREQUIREMENTS_FAILURE",
                    payload: error
                })
            })
    }
}

export const addPostTrainingComments = (postId, comment) => {
    // console.log('add post traiingcomments',comment)
    return async (dispatch) => {
        await Axios.put(`${baseUrl}/employerpost/postTrainingRequirementComments/${postId}`, { comment: comment })
            .then((resp) => {
                dispatch({
                    type: 'ADD_POSTTRAININGCOMMENTS_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "ADD_POSTTRAININGCOMMENTS_FAILURE",
                    payload: error
                })
            })
    }
}

export const getPostTrainingComments = (postId) => {
    return async (dispatch) => {
        await Axios.get(`${baseUrl}/employerpost/getTrainingRequirementComments/${postId}`)
            .then((resp) => {
                dispatch({
                    type: 'GET_TRAININGCOMMENTS_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "GET_TRAININGCOMMENTS_FAILURE",
                    payload: error
                })
            })
    }
}
export const deletePostTrainingComment = (postId, commentId) => {
    console.log('delete post traiingcomments', postId, commentId)
    return async (dispatch) => {
        await Axios.delete(`${baseUrl}/employerpost/deletePostTrainingComment/${postId}/${commentId}`)
            .then((resp) => {
                dispatch({
                    type: 'DELETE_COMMENT_SUCCESS',
                    payload: resp.data
                })
            }).catch((error) => {
                dispatch({
                    type: 'DELETE_COMMENT_FAILURE',
                    payload: error
                })
            })
    }

}

export const addlikePostTraining = (postId, likedBy) => {
    console.log(likedBy, postId);
    return async (dispatch) => {
        await Axios.put(`${baseUrl}/employerpost/addLikeToTrainingPost/${postId}`, { likedBy })
            .then((resp) => {
                dispatch({
                    type: 'ADD_LIKEPOSTTRAINING_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "ADD_LIKEPOSTTRAINING_FAILURE",
                    payload: error
                })
            })
    }
}

export const addBookMarkPostTraining = (postId, bookMarkedBy) => {
    console.log(bookMarkedBy, postId);
    return async (dispatch) => {
        await Axios.put(`${baseUrl}/employerpost/addBookMarkToTrainingPost/${postId}`, { bookMarkedBy })
            .then((resp) => {
                dispatch({
                    type: 'ADD_BOOKMARKPOSTTRAINING_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "ADD_BOOKMARKPOSTTRAINING_FAILURE",
                    payload: error
                })
            })
    }
}

export const deletePostTrainingRequirement = (postId) => {
    const token = Cookies.get('token')
    console.log(postId)
    return async (dispatch) => {
        await Axios.delete(`${baseUrl}/employerpost/deletePostRequirement/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((resp) => {
                dispatch({
                    type: 'POSTDELETED_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "POSTDELETED_FAILURE",
                    payload: error
                })
            })
    }
}

export const updatedApplicationStatus = (trainerId, trainingId, status) => {
    const token = Cookies.get('token')
    return async (dispatch) => {
        await Axios.put(`${baseUrl}/employerpost/updatedApplicationStatus`, { trainerId, trainingId, status }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((resp) => {
                dispatch({
                    type: 'UPDATE_APPLICAITONSTATUS_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "UPDATE_APPLICATIONSTATUS_FAILURE",
                    payload: error
                })
            })
    }
}

export const enableTrainingStatus = (appliedById, trainingId) => {
    console.log('from action ids',appliedById, trainingId)
    const token = Cookies.get('token')
    return async (dispatch) => {
        await Axios.put(`${baseUrl}/employerpost/enabletraining`, { appliedById, trainingId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((resp) => {
                dispatch({
                    type: 'UPDATE_ENABLESTATUS_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "UPDATE_ENABLESTATUS_FAILURE",
                    payload: error
                })
            })
    }
}


export const postJobRequirementAction = (postJobDetails) => {

    return async (dispatch) => {
        await Axios.post(`${baseUrl}/employerpost/postJobRequirement`, postJobDetails)
            .then((resp) => {
                dispatch({
                    type: 'POST_JOBREQUIREMENTS_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "POST_JOBREQUIREMENTS_FAILURE",
                    payload: error
                })
            })
    }
}

export const getJobRequirementAction = () => {

    return async (dispatch) => {
        await Axios.get(`${baseUrl}/employerpost/postJobRequirement`)
            .then((resp) => {
                dispatch({
                    type: 'GET_JOBREQUIREMENTS_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "GET_JOBREQUIREMENTS_FAILURE",
                    payload: error
                })
            })
    }
}
export const addHidePost = (postId, hideBy) => {

    return async (dispatch) => {
        await Axios.post(`${baseUrl}/employerpost/hidePost/${postId}`, { hideBy })
            .then((resp) => {
                dispatch({
                    type: 'ADD_HIDEPOST_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "ADD_HIDEPOST_FAILURE",
                    payload: error
                })
            })
    }
}


export const deteteEmployerPostById = (id, postId) => {
    const token = Cookies.get('token')

    return async (dispatch) => {
        await Axios.delete(`${baseUrl}/employerpost/deleteEmployerPostById/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { postId }
        })
            .then((resp) => {
                dispatch({
                    type: 'DELETE_POSTBYID_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "DELETE_POSTBYID_FAILURE",
                    payload: error
                })
            })
    }
}

export const updateEmployerPost = (postId, data) => {
    const token = Cookies.get('token')
    return async (dispatch) => {
        await Axios.put(`${baseUrl}/employerpost/updatePostTrainingRequirement/${postId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => {
                dispatch({
                    type: 'UPDATE_EMPLOYER_POST_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "UPDATE_EMPLOYER_POST_FAILURE",
                    payload: error
                })
            })
    }
}


