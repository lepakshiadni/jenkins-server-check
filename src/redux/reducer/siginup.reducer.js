// generateOTPReducer.js
const initialState = {
    otp:{},
    message: '',
    error: '',
    
  };
 
  const generateOTPReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GENERATE_OTP_SUCCESS':
        // console.log('generateotpsuccess', action);
        return {
          ...state,
          otp : action.payload,
          message: action.payload.message,
          error: '',
        };
      case 'GENERATE_OTP_FAILURE':
        return {
          ...state,
          message: '',
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
 
  export default generateOTPReducer;