import Axios from "axios";
import { detect } from "detect-browser";

const baseUrl = process.env.REACT_APP_API_URL;

export const verifyOtp = (contactDetails, otp) => {
  return async (dispatch) => {
    try {
      // Detect device information
      const browser = detect();
      const deviceInfo = browser ? `${browser.name} ${browser.version} on ${browser.os}` : 'Unknown device';
      const response = await Axios.post(`${baseUrl}/user/verifyotp`, { contactDetails, otp, deviceInfo });
      dispatch(verifyOtpSuccess(response.data));
    } catch (error) {
      dispatch(verifyOtpFailure(error.response?.data?.message || 'Invalid OTP'));
    }
  };
};

export const verifyOtpSuccess = (data) => ({
  type: 'VERIFY_OTP_SUCCESS',
  payload: data,
});

export const verifyOtpFailure = (error) => ({
  type: 'VERIFY_OTP_FAILURE',
  payload: { error },
});
