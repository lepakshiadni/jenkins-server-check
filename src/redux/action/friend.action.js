import Axios from 'axios'
// import Cookies from 'js-cookie'


export const frienduserAction=(friendid)=>{
    // const token=Cookies.get('token')
    console.log("friendid from redux", friendid)
    return async(dispatch)=>{

        try{
            Axios.get(`http://localhost:4000/user/${friendid}`)
        
        .then((resp)=>{
            // console.log(resp)
            dispatch(getuser_success(resp.data?.user))
        })            
        }
        catch(err){
            dispatch(getuser_failure(err))
        }
    }
}

export const getuser_success=(data)=>({
    type:'GETUSER_SUCCESS',
    payload:data

})

export const getuser_failure=(err)=>({
    type:'GETUSER_FAILURE',
    payload:err
})