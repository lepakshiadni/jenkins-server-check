import Axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;
console.log(baseUrl)


export const generateOtp = (contactDetails) => {
    return async (dispatch) => {
      try {
        const response = await Axios.post(`${baseUrl}/user/generateotp`, { contactDetails });
        dispatch(generateOTPSuccess(response.data));
      } catch (error) {
        dispatch(generateOTPFailure('Error generating OTP'));
      }
    };
  };
 
  export const generateOTPSuccess = (message) => ({
    type: 'GENERATE_OTP_SUCCESS',
    payload: { message },
  });
 
  export const generateOTPFailure = (error) => ({
    type: 'GENERATE_OTP_FAILURE',
    payload: { error },
  });
