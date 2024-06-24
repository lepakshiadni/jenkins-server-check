import React from "react";
import '../styles/SucessPage.css'
import checkMark from "../assets/CheckMark.png";

import { useNavigate } from "react-router-dom";
const CreateSuccessfull =  () => {
    const navigate = useNavigate()
    const role = localStorage.getItem("role")
    // console.log('createdsucceful mounted')
    React.useEffect(() => {
        setTimeout(() => {
            if (role === 'employer') {
                navigate("/employerDashboard/postarequirements/post-training"); // Navigate to the next page
            }
            else if (role === 'trainer') {
                navigate("/trainerDashboard/feed"); // Navigate to the next page
            }

        }, [2000])

    }, [])

    return (
        <div className="flex justify-center items-center">

            <div className=" h-[100%] w-full flex flex-col items-center justify-stretch ">
                <div className=" check-mark w-[300px] h-[300px] rounded-full flex items-center justify-center  bg-gradient-to-br from-blue-300 to-blue-400  ">
                    <div className="tick-mark h-[125px] w-[170px] flex items-center justify-center  ">
                        <img className="" src={checkMark} alt="" />
                    </div>
                </div>
                <div className="celebrateImg animate-ping w-[650px] h-[500px] z-10 flex flex-col items-center gap-10 justify-center">
                </div>

            </div>
            <h3 className=" footer text-center text-[#333333] text-base font-[600] ">
                Welcome Back, Knowledge Seeker! <br /> Your Learning adventure Continues
                with SISSOO
            </h3>

        </div>
    );

}
export default CreateSuccessfull
// const CreateSuccessfull => () {
//     const role= await localStorage.getItem(role)
//     // console.log('createdsucceful mounted')
//     const navigate=useNavigate()
//     React.useEffect(()=>{
//         setTimeout(()=>{
//             if(role==='employer'){
//                 navigate("/employerDashboard/postarequirements/post-training"); // Navigate to the next page
//             }
//             else if (role==='trainer'){
//                 navigate("/trainerDashboard/feed"); // Navigate to the next page
//             }

//         },[1000])

//     },[])

//     return (
//         <>

//             <div className=" h-[100%] w-full flex flex-col items-center justify-stretch ">
//                 <div className=" check-mark w-[300px] h-[300px] rounded-full flex items-center justify-center  bg-gradient-to-br from-blue-300 to-blue-400  ">
//                     <div className="tick-mark h-[125px] w-[170px] flex items-center justify-center  ">
//                         <img className="" src={checkMark} alt="" />
//                     </div>
//                 </div>
//                 <div className="celebrateImg animate-ping w-[650px] h-[500px] z-10 flex flex-col items-center gap-10 justify-center">
//                 </div>

//             </div>
//             <h3 className=" footer text-center text-[#333333] text-base font-[600] ">
//                 Welcome Back, Knowledge Seeker! <br /> Your Learning adventure Continues
//                 with SISSOO
//             </h3>

//         </>
//     );
// }

// export default CreateSuccessfull;



