import Axios from "axios";
import Cookies from 'js-cookie'
const baseUrl = process.env.REACT_APP_API_URL;

const trainerSignUpAction = (details) => {
    console.log(details)
    return async (dispatch) => {
        try {
            await Axios.post(`${baseUrl}/trainer/trainerSignup`, details)
                .then((resp) => {
                    dispatch({
                        type: 'TRAINER_SIGNUP_SUCCESS',
                        payload: resp.data
                    })
                })
        } catch (error) {
            dispatch({
                type: 'TRAINER_SIGNUP_FAILURE',
                payload: { error }
            })
        }
    };
}

const trainerDetails = () => {
    const token = Cookies.get('token')
    // console.log(token)
    console.log('trainer details action ')
    return async (dispatch) => {
        try {
            Axios.get(`${baseUrl}/trainer/gettrainerProfile`, {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'GET_TRAINERDETAILS_FETCHED',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "UNAUTHORIZED",
                payload: err
            })
        }
    }
}
export const gettrainerDetailsById = (id) => {
    const token = Cookies.get('token')
    // console.log(token)
    console.log('trainer details action ')
    return async (dispatch) => {
        try {
            Axios.get(`${baseUrl}/trainer/gettrainerProfile`, id, {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'GET_TRAINERDETAILS_FETCHED',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "UNAUTHORIZED",
                payload: err
            })
        }
    }
}

const trainerBasicInfoUpdate = (details) => {
    const token = Cookies.get('token')
    // console.log(token)
    console.log('trainer details action ', details)
    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/trainer/trainerBasicInfoUpdate`, details, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // "Content-Type": "application/json"
                }
            })
                .then((resp) => {
                    dispatch({
                        type: 'TRAINERBASICINFO_UPDATED_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "TRAINERBASICINFO_UPDATE_FAILURE",
                payload: err
            })
        }
    }
}

export const trainerProfileImgUpdate = (formData) => {
    const token = Cookies.get('token')
    return async (dispatch) => {
        try {

            Axios.put(`${baseUrl}/trainer/trainerProfileImgUpdate`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    dispatch({
                        type: 'TRAINERPROFILE_IMAGE_UPDATE_SUCCESS',
                        payload: resp.data

                    })
                })
        }
        catch (error) {

            dispatch({
                type: 'TRAINERPROFILE_IMAGE_UPDATE_FAILURE',
                payload: error
            })
        }

    }
}

export const trainerProfileBannerUpdate = (formData) => {
    const token = Cookies.get('token')
    return async (dispatch) => {
        try {

            Axios.put(`${baseUrl}/trainer/trainerProfileBannerUpdate`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    dispatch({
                        type: 'TRAINERPROFILE_BANNER_UPDATE_SUCCESS',
                        payload: resp.data

                    })
                })
        }
        catch (error) {

            dispatch({
                type: 'TRAINERPROFILE_BANNER_UPDATE_FAILURE',
                payload: error
            })
        }

    }
}

export const trainerSkillsUpdate = (details) => {
    const token = Cookies.get('token')
    // console.log(token)
    console.log('trainer details action ', details)
    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/trainer/trainerSkillsUpdate`, details, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'TRAINERSKILSSINFO_UPDATED_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "TRAINERSKILSSINFO_UPDATE_FAILURE",
                payload: err
            })
        }
    }
}


export const updateSkillRating = (skillId, newRange) => {
    const token = Cookies.get('token')
    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/trainer/updateAllSkills/${skillId}`, { newRange }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"

                }
            })
                .then((resp) => {
                    dispatch({
                        type: 'UPDATE_ALLRATING_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "UPDATE_ALLRATING_FAILURE",
                payload: err
            })
        }
    }
}

export const trainerCertificateUpdate = (details) => {
    const token = Cookies.get('token')
    // console.log(token)
    console.log('trainer details action ', details)
    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/trainer/trainerCertificateUpdate`, details, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // "Content-Type": "application/json"
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'TRAINERCERTIFICATEINFO_UPDATED_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "TRAINERCERTIFICATEINFO_UPDATE_FAILURE",
                payload: err
            })
        }
    }
}

export const trainerContactInfoUpdate = (details) => {
    const token = Cookies.get('token')
    // console.log(token)
    console.log('trainer details action ', details)
    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/trainer/trainerContactInfoUpdate`, details, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"

                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'TRAINERCONTACTINFO_UPDATED_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "TRAINERCONTACTINFO_UPDATE_FAILURE",
                payload: err
            })
        }
    }
}

export const trainerExperienceInfoUpdate = (details) => {
    const token = Cookies.get('token')
    // console.log(token)
    console.log('trainer details action ', details)
    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/trainer/trainerExperienceInfoUpdate`, details, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'TRAINEREXPERIENCEINFO_UPDATED_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "TRAINEREXPERIENCEINFO_UPDATE_FAILURE",
                payload: err
            })
        }
    }
}

export const deleteTrainerCertificate = (id) => {
    const token = Cookies.get("token");
    // console.log(token)
    console.log("trainer details action ", id);
    return async (dispatch) => {
        try {
            Axios.delete(`${baseUrl}/trainer/trainerCertificateDelete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }).then((resp) => {
                // console.log(resp)
                dispatch({
                    type: "DELETE_TRAINER_CERTIFICATE_SUCCESS",
                    payload: resp.data,
                });
            });
        } catch (err) {
            dispatch({
                type: "DELETE_TRAINER_CERTIFICATE_FAILURE",
                payload: err,
            });
        }
    };
};

const addBookMarkePost = (postId, postDetails) => {
    const token = Cookies.get('token')
    console.log(postId, 'add bookmark post ', postDetails)
    return async (dispatch) => {
        try {
            Axios.post(`${baseUrl}/trainer/addBookMarkePost/${postId}`, postDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'ADD_BOOKMARKEDPOST_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (resp) {
            dispatch({
                type: "ADD_BOOKMARKEDPOSTFAILURE",
                payload: resp.data
            })
        }
    }

}

const getBookMarkedPost = () => {
    const token = Cookies.get('token')
    console.log('get bookMarkepost Action')
    return async (dispatch) => {
        try {
            Axios.get(`${baseUrl}/trainer/getBookMarkedPostsByUserId `, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'GET_BOOKMARKEDPOST_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "GET_BOOKMARKEDPOST_FAILURE",
                payload: err
            })
        }
    }

}

const trainerAppliedTraining = (trainingPostId, trainingDetails) => {
    const token = Cookies.get('token')
    console.log('POST trainerApplied  Action')
    return async (dispatch) => {

        Axios.post(`${baseUrl}/trainer/trainerAppliedTraining/${trainingPostId} `, trainingDetails, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((resp) => {
                // console.log(resp)
                dispatch({
                    type: 'POST_TRAINERAPPLIEDTRAINING_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: "POST_TRAINERAPPLIEDTRAINING_FAILURE",
                    payload: error?.response?.data
                })
            })

    }

}

const gettrainerAppliedTraining = () => {
    const token = Cookies.get('token')
    console.log('get getAppliedTraining Action')
    return async (dispatch) => {
        try {
            Axios.get(`${baseUrl}/trainer/getAppliedTraining `, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'GET_APPLIEDTRAINING_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "GET_APPLIEDTRAINING_FAILURE",
                payload: err
            })
        }
    }

}

export const deleteAppliedTraining = (trainingPostId) => {
    const token = Cookies.get('token')
    console.log('delete training Action')
    return async (dispatch) => {
        try {
            Axios.delete(`${baseUrl}/trainer/deleteAppliedTraining/${trainingPostId} `, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'APPLIEDTRAININGDELETED_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (error) {
            dispatch({
                type: "APPLIEDTRAININGDELETED_FAILURE",
                payload: error
            })
        }
    }
}

export const getSkillsData = () => {
    // console.log('get SkillsData Action')
    return async (dispatch) => {
        try {
            Axios.get(`${baseUrl}/trainer/skills `)
                .then((resp) => {
                    dispatch({
                        type: 'GET_SKILLDATA_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (err) {
            dispatch({
                type: "GET_SKILLDATA_FAILURE",
                payload: err
            })
        }
    }
}

export const createConversation = (senderId, receiverId) => {
    const token = Cookies.get('token')
    console.log('create conversation Action')
    return async (dispatch) => {
        try {
            Axios.post(`${baseUrl}/conversation/newconversation/`, { senderId, receiverId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'CONVERSATIONCREATED_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (error) {
            dispatch({
                type: "CONVERSATIONCREATED_FAILURE",
                payload: error
            })
        }
    }
}
export const getConversation = (userId) => {
    const token = Cookies.get('token')
    console.log('get conversation Action')
    return async (dispatch) => {
        try {
            Axios.get(`${baseUrl}/conversation/getConversation/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'GET_CONVERSATIONCREATED_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (error) {
            dispatch({
                type: "GET_CONVERSATIONCREATED_FAILURE",
                payload: error
            })
        }
    }
}

export const getAllRequestedConnection = () => {
    const token = Cookies.get('token')
    console.log('get REQUEST  Action')
    return async (dispatch) => {
        try {
            Axios.get(`${baseUrl}/conversation/getAllRequested`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'GET_AllREQUEST_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (error) {
            dispatch({
                type: "GET_AllREQUEST_FAILURE",
                payload: error
            })
        }
    }
}

export const getConversationRequest = () => {
    const token = Cookies.get('token')
    console.log('get conversation Action')
    return async (dispatch) => {
        try {
            Axios.get(`${baseUrl}/conversation/trainerConnectionRequest`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'GET_CONVERSATIONREQUEST_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (error) {
            dispatch({
                type: "GET_CONVERSATIONREQUEST_FAILURE",
                payload: error
            })
        }
    }
}
export const conversationRequestAccept = (requestId) => {
    const token = Cookies.get('token')
    console.log('request conversation Action')
    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/conversation/trainerConversationRequestAccept`, { requestId }, {
                headers: {
                    Authorization: `Bearer ${token}`,


                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'ACCEPT_CONVERSATIONREQUEST_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (error) {
            dispatch({
                type: "ACCEPT_CONVERSATIONREQUEST_FAILURE",
                payload: error
            })
        }
    }
}
export const conversationRequestDecline = (id) => {
    const token = Cookies.get('token')
    console.log('request conversation Action')
    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/conversation/trainerdeclineConversation`, { id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'Decline_CONVERSATIONREQUEST_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (error) {
            dispatch({
                type: "Decline_CONVERSATIONREQUEST_FAILURE",
                payload: error
            })
        }
    }
}

export const conversationRemove = (id) => {
    const token = Cookies.get('token')
    console.log('remover conversation Action')
    return async (dispatch) => {
        try {
            Axios.delete(`${baseUrl}/conversation/trainerremoveConversation/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'REMOVE_CONNECTION_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (error) {
            dispatch({
                type: "REMOVE_CONNECTION_FAILURE",
                payload: error
            })
        }
    }
}


export const addTrainingResources = (trainingDetailsId, details) => {
    const token = Cookies.get('token')
    console.log(trainingDetailsId, 'add resources ', details)
    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/trainer/addTrainingResources/${trainingDetailsId}`, details, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    // console.log(resp)
                    dispatch({
                        type: 'ADD_TRAINING_RESOURCES_SUCCESS',
                        payload: resp.data
                    })
                })
        }
        catch (resp) {
            dispatch({
                type: "ADD_TRAINING_RESOURCES_FAILURE",
                payload: resp.data
            })
        }
    }

}

export const getAllRequestTrainer = () => {
    const token = Cookies.get('token')
    // console.log('Add Applicaiton Request   Action')
    return async (dispatch) => {

        Axios.get(`${baseUrl}/trainer/getAllRequestTrainer`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((resp) => {
                // console.log(resp)
                dispatch({
                    type: 'GET_ALLREQUEST_SUCCESS',
                    payload: resp.data
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: "GET_ALLREQUEST_FAILURE",
                    payload: error?.response?.data
                })
            })

    }
}

export const updateApplicationStatus = (trainingDetailsId, employerId, trainingDetails, status) => {
    const token = Cookies.get("token");
    // console.log(token);
    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/trainer/updateRequestStatus`, { trainingDetailsId, employerId, trainingDetails, status }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((resp) => {
                // console.log(resp)
                dispatch({
                    type: "UPDATEDAPPLIEDSTATUS_SUCCESSS",
                    payload: resp.data,
                });
            });
        } catch (error) {
            dispatch({
                type: "UPDATEDAPPLIEDSTATUS_FAILURE",
                payload: error,
            });
        }
    };
}

export const trainerPhoneUpdate = (contactDetails,oldContactInfo, otp) => {
    const token = Cookies.get("token");
    // console.log(token)
    console.log("trainer details action ", contactDetails,oldContactInfo, otp);
    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/trainer/phoneNumberUpdate`, { contactDetails,oldContactInfo, otp }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((resp) => {
                // console.log(resp)
                dispatch({
                    type: "TRAINERPHONE_UPDATED_SUCCESS",
                    payload: resp.data,
                });
            });
        } catch (err) {
            dispatch({
                type: "TRAINERPHONE_UPDATE_FAILURE",
                payload: err,
            });
        }
    };
};

export const getAllNotification =(userId)=>{
    // const token = Cookies.get("token");
    console.log("trainer notification action ",userId );
    return async (dispatch) => {
        try {
            Axios.get(`${baseUrl}/trainer/notifications/${userId}`,
            //   {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // }
        ).then((resp) => {
                // console.log(resp)
                dispatch({
                    type: "GET_ALL_NOTIFICATION_SUCCESS",
                    payload: resp.data,
                });
            });
        } catch (err) {
            dispatch({
                type: "GET_ALL_NOTIFICATION_FAILURE",
                payload: err,
            });
        }
    };

}

export const readNotification=(notificationId,userId)=>{
    console.log("trainer notification action ",userId );

    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/trainer/updateReadNotification/${notificationId}`,{userId},
            //   {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // }
        ).then((resp) => {
                // console.log(resp)
                dispatch({
                    type: "READ_NOTIFICATION_SUCCESS",
                    payload: resp.data,
                });
            });
        } catch (err) {
            dispatch({
                type: "READ_NOTIFICATION_FAILURE",
                payload: err,
            });
        }
    };
}

export const deleteAllNotification=(userId)=>{
    console.log("trainer notification action ",userId );

    return async (dispatch) => {
        try {
            Axios.put(`${baseUrl}/trainer/deleteAllNotification`,{userId},
            //   {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // }
        ).then((resp) => {
                // console.log(resp)
                dispatch({
                    type: "DELETEALL_NOTIFICATION_SUCCESS",
                    payload: resp.data,
                });
            });
        } catch (err) {
            dispatch({
                type: "DELETEALL_NOTIFICATION_FAILURE",
                payload: err,
            });
        }
    };
}


export {
    trainerSignUpAction, trainerDetails,
    addBookMarkePost,
    getBookMarkedPost,
    trainerAppliedTraining,
    gettrainerAppliedTraining,
    trainerBasicInfoUpdate
}