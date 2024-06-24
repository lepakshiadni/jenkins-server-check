// verifyOTPReducer.js

const initialState = {
    type: '',
    message: '',
    data:{},
  };
 
  const verifyOTPReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'VERIFY_OTP_SUCCESS':
        console.log('Verify OTP success', action);
        return {
          ...state,
          type: action.type,
          message: action.payload.message,
          data:action.payload,

        };
      case 'VERIFY_OTP_FAILURE':
        return {
          ...state,
          type: '',
          message: action.payload.error,
          data: {},
        };
      default:
        return state;
    }
  };
 
export default verifyOTPReducer;
 