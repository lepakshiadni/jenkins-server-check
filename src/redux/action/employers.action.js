import Axios from "axios";
import Cookies from "js-cookie";
const baseUrl = process.env.REACT_APP_API_URL;


const employerSignUpAction = (details) => {
  return async (dispatch) => {
    try {
      await Axios.post(`${baseUrl}/employer/employerSignUp`, details)
        .then((resp) => {
          dispatch({
            type: "EMPLOYER_SIGNUP_SUCCESS",
            payload: resp.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: "EMPLOYER_SIGNUP_FAILD",
            payload: error,
          });
        });
    } catch (error) {
      dispatch({
        type: "EMPLOYER_SIGNUP_FAILD",
        payload: error,
      });
    }
  };
};

const employerDetails = () => {
  const token = Cookies.get("token");
  // console.log(token);
  return async (dispatch) => {
    try {
      Axios.get(`${baseUrl}/employer/getemployerProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        // console.log(resp.data)
        dispatch({
          type: "GET_EMPLOYEEDETAILS_FETCHED",
          payload: resp.data,
        });
      });
    } catch (err) {
      dispatch({
        type: "UNAUTHORIZED",
        payload: err,
      });
    }
  };
};

export const employerBasicInfoUpdate = (details) => {
  const token = Cookies.get("token");
  // console.log(token)
  console.log("employer details action ", details);
  return async (dispatch) => {
    try {
      Axios.put(`${baseUrl}/employer/employerBasicInfoUpdate`, details, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }).then((resp) => {
        dispatch({
          type: "EMPLOYERBASICINFO_UPDATED_SUCCESS",
          payload: resp.data,
        });
      });
    } catch (err) {
      dispatch({
        type: "EMPLOYERBASICINFO_UPDATE_FAILURE",
        payload: err,
      });
    }
  };
};

export const employerProfileImgUpdate = (formData) => {
  const token = Cookies.get('token')
  return async (dispatch) => {
    try {

      Axios.put(`${baseUrl}/employer/employerProfileImgUpdate`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((resp) => {
          dispatch({
            type: 'EMPLOYERPROFILE_IMAGE_UPDATE_SUCCESS',
            payload: resp.data

          })
        })
    }
    catch (error) {

      dispatch({
        type: 'EMPLOYERPROFILE_IMAGE_UPDATE_FAILURE',
        payload: error
      })
    }

  }
}

export const employerProfileBannerUpdate = (formData) => {
  const token = Cookies.get('token')
  return async (dispatch) => {
    try {

      Axios.put(`${baseUrl}/employer/employerProfileBannerUpdate`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((resp) => {
          dispatch({
            type: 'EMPLOYERPROFILE_BANNER_UPDATE_SUCCESS',
            payload: resp.data

          })
        })
    }
    catch (error) {

      dispatch({
        type: 'EMPLOYERPROFILE_BANNER_UPDATE_FAILURE',
        payload: error
      })
    }

  }
}

export const employerSkillsUpdate = (details) => {
  const token = Cookies.get("token");
  // console.log(token)
  console.log("employer details action ", details);
  return async (dispatch) => {
    try {
      Axios.put(`${baseUrl}/employer/employerSkillsUpdate`, details, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }).then((resp) => {
        // console.log(resp)
        dispatch({
          type: "EMPLOYERSKILSSINFO_UPDATED_SUCCESS",
          payload: resp.data,
        });
      });
    } catch (err) {
      dispatch({
        type: "EMPLOYERSKILSSINFO_UPDATE_FAILURE",
        payload: err,
      });
    }
  };
};

export const employerContactInfoUpdate = (details) => {
  const token = Cookies.get("token");
  // console.log(token)
  console.log("employer details action ", details);
  return async (dispatch) => {
    try {
      Axios.put(`${baseUrl}/employer/employerContactInfoUpdate`, details, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }).then((resp) => {
        // console.log(resp)
        dispatch({
          type: "EMPLOYERCONTACTINFO_UPDATED_SUCCESS",
          payload: resp.data,
        });
      });
    } catch (err) {
      dispatch({
        type: "EMPLOYERCONTACTINFO_UPDATE_FAILURE",
        payload: err,
      });
    }
  };
};

export const employerExperienceInfoUpdate = (details) => {
  const token = Cookies.get("token");
  // console.log(token)
  console.log("employer details action ", details);
  return async (dispatch) => {
    try {
      Axios.put(`${baseUrl}/employer/employerExperienceInfoUpdate`, details, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }).then((resp) => {
        // console.log(resp)
        dispatch({
          type: "EMPLOYEREXPERIENCEINFO_UPDATED_SUCCESS",
          payload: resp.data,
        });
      });
    } catch (err) {
      dispatch({
        type: "EMPLOYEREXPERIENCEINFO_UPDATE_FAILURE",
        payload: err,
      });
    }
  };
};

export const deleteEmployerExperience = (_id) => {
  const token = Cookies.get("token");
  // console.log(token)
  console.log("employer details action ", _id);
  return async (dispatch) => {
    try {
      Axios.delete(`${baseUrl}/employer/employerExperienceInfoUpdate/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }).then((resp) => {
        // console.log(resp)
        dispatch({
          type: "DELETE_EMPLOYER_EXPERIENCE_SUCCESS",
          payload: resp.data,
        });
      });
    } catch (err) {
      dispatch({
        type: "DELETE_EMPLOYER_EXPERIENCE_FAILURE",
        payload: err,
      });
    }
  };
};

export const getSkillsData = () => {
  const token = Cookies.get('token')
  console.log('get SkillsData Action')
  return async (dispatch) => {
    try {
      Axios.get(`${baseUrl}/employer/skills `, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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

export const getAppliedTrainingEmployer = () => {
  const token = Cookies.get("token");
  // console.log(token);
  return async (dispatch) => {
    try {
      Axios.get(`${baseUrl}/employer/getAppliedTrainingEmployer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        console.log(resp)
        dispatch({
          type: "APPLIEDTRAININGFECTED_SUCCESS",
          payload: resp.data,
        });
      });
    } catch (error) {
      dispatch({
        type: "APPLIEDTRAININGFECTED_FAILURE",
        payload: error,
      });
    }
  };
};

export const getAcceptedTrainingEmployer = () => {
  const token = Cookies.get("token");
  // console.log(token);
  return async (dispatch) => {
    try {
      Axios.get(`${baseUrl}/employer/getAcceptedTrainingEmployer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        // console.log(resp)
        dispatch({
          type: "ACCEPTEDTRAININGFECTED_SUCCESSS",
          payload: resp.data,
        });
      });
    } catch (error) {
      dispatch({
        type: "ACCEPTEDTRAININGFECTED_FAILURE",
        payload: error,
      });
    }
  };
};

export const getAllAppliedTraining = () => {
  const token = Cookies.get("token");
  // console.log(token);
  return async (dispatch) => {
    try {
      Axios.get(`${baseUrl}/employer/getAllAppliedTraining`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        // console.log(resp)
        dispatch({
          type: "ALLAPPLIEDTRAININGFECTED_SUCCESSS",
          payload: resp.data,
        });
      });
    } catch (error) {
      dispatch({
        type: "ALLAPPLIEDTRAININGFECTED_FAILURE",
        payload: error,
      });
    }
  };
};

export const updateApplicationStatus = (trainingDetailsId, trainerId, status) => {
  const token = Cookies.get("token");
  // console.log(token);
  return async (dispatch) => {
    try {
      Axios.put(`${baseUrl}/employer/updateAppliedStatus`, { trainingDetailsId, trainerId, status }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
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

// export const addBookMarkePost = (postId, postDetails) => {
//   const token = Cookies.get('token')
//   console.log(postId, 'add bookmark post ', postDetails)
//   return async (dispatch) => {
//     try {
//       Axios.post(`${baseUrl}/employer/addBookMarkePost/${postId}`, postDetails, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       })
//         .then((resp) => {
//           // console.log(resp)
//           dispatch({
//             type: 'ADD_BOOKMARKEDPOST_SUCCESS',
//             payload: resp.data
//           })
//         })
//     }
//     catch (resp) {
//       dispatch({
//         type: "ADD_BOOKMARKEDPOSTFAILURE",
//         payload: resp.data
//       })
//     }
//   }

// }

export const getBookMarkedPost = () => {
  const token = Cookies.get('token')
  console.log('get bookMarkepost Action')
  return async (dispatch) => {
    try {
      Axios.get(`${baseUrl}/employer/getBookMarkedPostsByUserId `, {
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

export const addFeedback = (feedBack, trainingDetailsId) => {
  const token = Cookies.get('token');
  return async (dispatch) => {
    try {
      Axios.put(`${baseUrl}/employer/addFeedback/${trainingDetailsId}`, feedBack, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }).then((resp) => {
        // console.log(resp)
        dispatch({
          type: "ADDFEEDBACK_SUCCESSS",
          payload: resp.data,
        });
      });
    } catch (error) {
      dispatch({
        type: "ADDFEEDBACK_FAILURE",
        payload: error,
      });
    }
  }
}

export const addApplicationRequest = (trainer, trainingDetails) => {
  const token = Cookies.get('token')
  console.log('Add Applicaiton Request   Action')
  return async (dispatch) => {

    Axios.post(`${baseUrl}/employer/employerTrainingRequest `, { trainer, trainingDetails }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((resp) => {
        // console.log(resp)
        dispatch({
          type: 'ADD_APPLICATIONREQUEST_SUCCESS',
          payload: resp.data
        })
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: "ADD_APPLICATIONREQUEST_FAILURE",
          payload: error?.response?.data
        })
      })

  }
}

export const getAllCandidacy = () => {
  const token = Cookies.get('token')
  console.log('Add Applicaiton Request   Action')
  return async (dispatch) => {

    Axios.get(`${baseUrl}/employer/getEmployerApplicationRequest`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((resp) => {
        // console.log(resp)
        dispatch({
          type: 'GET_ALLCANDIDACY_SUCCESS',
          payload: resp.data
        })
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: "GET_ALLCANDIDACY_FAILURE",
          payload: error?.response?.data
        })
      })

  }

}

export const employerPhoneUpdate = (contactDetails,oldContactInfo, otp) => {
  const token = Cookies.get("token");
  // console.log(token)
  console.log("employer details action ", contactDetails,oldContactInfo, otp);
  return async (dispatch) => {
    try {
      Axios.put(`${baseUrl}/employer/phoneNumberUpdate`, { contactDetails,oldContactInfo, otp }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        // console.log(resp)
        dispatch({
          type: "EMPLOYERPHONE_UPDATED_SUCCESS",
          payload: resp.data,
        });
      });
    } catch (err) {
      dispatch({
        type: "EMPLOYERPHONE_UPDATE_FAILURE",
        payload: err,
      });
    }
  };
};

export const createConversation = (senderId, receiverId) => {
  const token = Cookies.get('token')
  console.log('create conversation Action')
  return async (dispatch) => {
    try {
      Axios.post(`${baseUrl}/conversation/newconversation`, { senderId, receiverId }, {
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
      Axios.get(`${baseUrl}/conversation/employerConnectionRequest`, {
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
      Axios.put(`${baseUrl}/conversation/employerConversationRequestAccept`, { requestId }, {
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
      Axios.put(`${baseUrl}/conversation/employerdeclineConversation`, { id }, {
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
          Axios.delete(`${baseUrl}/conversation/employerremoveConversation/${id}`, {
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

export const getAllNotification =(userId)=>{
  // const token = Cookies.get("token");
  console.log("trainer notification action ",userId );
  return async (dispatch) => {
      try {
          Axios.get(`${baseUrl}/employer/notifications/${userId}`,
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
          Axios.put(`${baseUrl}/employer/updateReadNotification/${notificationId}`,{userId},
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
          Axios.put(`${baseUrl}/employer/deleteAllNotification`,{userId},
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





export { employerSignUpAction, employerDetails };
