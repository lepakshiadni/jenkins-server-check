import Axios from 'axios'
import Cookies from 'js-cookie'
const baseUrl = process.env.REACT_APP_API_URL;



export const employerCreatePost = (postDetails) => {
    // console.log(postTrainingDetails)
    const token = Cookies.get('token')
    // console.log(token);
    return async (dispatch) => {
        await Axios.post(`${baseUrl}/employerpost/employercreatepost`, postDetails, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        })
            .then((resp) => {
                if (resp.data?.success) {
                    dispatch({
                        type: 'EMPLOYERCREATEPOST_SUCCESS',
                        payload: resp.data
                    })
                }
                else{
                    dispatch({
                        type: 'EMPLOYERCREATEPOST_FAILURE',
                        payload: resp.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: "EMPLOYERCREATEPOST_FAILURE",
                    payload: error
                })
            })
    }
}
