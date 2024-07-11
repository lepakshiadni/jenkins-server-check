import Axios from 'axios'
import Cookies from 'js-cookie'
const baseUrl = process.env.REACT_APP_API_URL;


export const trainerCreatePost = (postDetails) => {
    // console.log(postTrainingDetails)
    const token = Cookies.get('token')
    // console.log(token);
    return async (dispatch) => {
        await Axios.post(`${baseUrl}/trainerpost/trainerCreatePost`, postDetails,{
            headers:{
                Authorization: `Bearer ${token}`,
                
            }
        })
            .then((resp) => {
                dispatch({
                    type: 'TRAINERCREATEPOST_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: "TRAINERCREATEPOST_FAILURE",
                    payload: error
                })
            })
    }
}

export const getTrainerCreatePost = () => {
    const token = Cookies.get('token')
    console.log('get bookMarkepost Action')
    return async (dispatch) => {
        try {
            Axios.get(`${baseUrl}/trainerpost/getTrainerPost `, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'GET_TRAINERCREATEPOST_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "GET_TRAINERCREATEPOST_FAILURE",
                payload: err
            })
        }
    }

}

//for trainer by id

export const getTrainerCreatePostById = () => {
    const token = Cookies.get('token')
    console.log('get trainer Action')
    return async (dispatch) => {
        try {
            Axios.get(`${baseUrl}/trainerpost/getTrainerPostBy `, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'GET_TRAINERPOST_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "GET_TRAINERPOST_FAILURE",
                payload: err
            })
        }
    }

}

export const addPostTrainerComments = (postId, comment) => {
    console.log('add post traiingcomments',comment,postId)
    return async (dispatch) => {
        await Axios.put(`${baseUrl}/trainerpost/addTrainerPostComments/${postId}`, { comment: comment })
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

export const getPostTrainerComments = (postId) => {
    return async (dispatch) => {
        await Axios.get(`${baseUrl}/trainerpost/getTrainierPostComments/${postId}`)
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

export const addlikePostTrainer = (postId, likedBy) => {
    console.log(likedBy, postId);
    return async (dispatch) => {
        await Axios.put(`${baseUrl}/trainerpost/addLikeToTrainerPost/${postId}`, { likedBy })
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

export const addBookMarkPostTrainer = (postId, bookMarkedBy) => {
    return async (dispatch) => {
        await Axios.put(`${baseUrl}/trainerpost/addBookMarkToTrainerPost/${postId}`, { bookMarkedBy })
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

export const deletePostTrainerComment = (postId, commentId) => {
    console.log('delete post traiingcomments', postId, commentId)
    return async (dispatch) => {
        await Axios.delete(`${baseUrl}/trainerpost/deleteTrainerPostComment/${postId}/${commentId}`)
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

export const addHidePost = (postId, hideBy) => {
    
    return async (dispatch) => {
        await Axios.post(`${baseUrl}/trainerpost/hidePost/${postId}`, { hideBy })
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

export const deteteTrainerPostById = (postId,userId) => {
    const token = Cookies.get('token')
    return async (dispatch) => {
        await Axios.delete(`${baseUrl}/trainerpost/deleteTrainerPostById/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { userId }
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