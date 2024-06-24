import React, { useEffect, useState } from 'react'
import Time from 'timesago'
import { useSelector } from "react-redux";


function Messages({ messages, own, selecteduser }) {
  const [ownUser, setOwnUser] = useState(null)

  const employer = useSelector(({ employerSignUp }) => {
    return employerSignUp?.employerDetails
  })
  const trainer = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.trainerDetails;
  })

  useEffect(() => {
    if (employer?.success) {
      setOwnUser(employer?.employerDetails);
    }
    if (trainer?.success) {
      setOwnUser(trainer?.trainerDetails);
    }
  }, [employer, trainer]);
  const timeagp = Time(messages.createdAt)
  return (
    <div >
      {
        own ?

          <div className="flex flex-row-reverse gap-4 mr-[21px] space-y-1 mb-[20px] items-center ">
            {/* own message */}

            <div className="">
              {
                ownUser?.basicInfo.profileImg ? <><img
                  className="Ellipse22 w-[40px] h-[40px] rounded-full "
                  src={ownUser?.basicInfo.profileImg}
                  alt=""
                /></> : <>
                  <div className='w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-500'>
                    <p className="text-['Poppins'] text-lg"> {ownUser?.fullName[0]}</p>
                  </div>
                </>
              }

            </div>

            <div className="w-auto">
                <div className=" text-[#fff]  text-xs font-normal font-['Poppins'] pl-[10px]  bg-[#2676c2] text-end rounded-tl-lg rounded-tr-[20px] rounded-bl-lg flex justify-end pr-[10px] h-9 items-center ">
                  {messages?.text}
                </div>
              <div>
                <div className="messageBottom text-zinc-400 text-end mt-[5px]  text-[10px] font-normal font-['Poppins'] ">{timeagp}</div>
              </div>
            </div>

          </div>


          :

          <div className="flex ml-[21px] space-x-1 mb-[20px] ">

            {/* friednmessge */}

            <div className="">
              {
                selecteduser?.basicInfo?.profileImg ? <>
                  <img
                className="Ellipse22 w-[40px] h-[40px] rounded-full mt-[10px]"
                src={selecteduser?.basicInfo?.profileImg}
                alt=""
              />
                </> : <>
                  <div className='w-[40px] h-[40px] rounded-full mt-[10px] flex justify-center items-center bg-slate-500'>
                    <p className="text-['Poppins'] text-lg"> {selecteduser?.fullName[0]}</p>
                  </div>
                </>
              }
            </div>
            <div>
              <div className="Rectangle128 m-[10px] w-[100%] flex h-9  bg-zinc-100 rounded-tl-[20px] rounded-tr-lg rounded-br-lg border border-gray-200" >
                <div className=" text-neutral-500 text-xs font-normal font-['Poppins'] m-[10px] text-start">
                  {messages?.text}
                </div>
              </div>
              <div>
                <div className="messageBottom text-zinc-400 text-[10px] font-normal font-['Poppins'] ml-[10px]">{timeagp}</div>
              </div>
            </div>
          </div>


      }





    </div>
  )
}

export default Messages