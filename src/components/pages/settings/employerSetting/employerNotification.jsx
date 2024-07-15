import React, { useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function EmployerNotifications() {
  const [notificationSub, setNotificationSub] = useState(null);

  const activeNotificationSub = () => {
    switch (notificationSub) {
      case 'messages': return (<>

        <div className="border-[0.5px] border-[#eeeeee]  w-full p-5">
          <button onClick={() => setNotificationSub(null)} className="text-blue-500 cursor-pointer"><span><ArrowBackIcon /></span> <span>Back</span></button>
          <div className="mt-5">

            <div className="mt-2 ">
              <span>Do you want to change message notification?</span>
              <div className="mt-5 flex gap-5">
                <button className='p-[5px] w-40 border-[0.5px] border-[#2676C2] text-[#2676c2] bg'>Don't show</button>
                <button className='p-[5px] w-40 text-white bg-[#2676c2]'>Show</button>
              </div>
            </div>
          </div>
        </div>

      </>)
      case 'update profile': return (<>

        <div className="border-[0.5px] border-[#eeeeee]  w-full p-5">
          <button onClick={() => setNotificationSub(null)} className="text-blue-500 cursor-pointer"><span><ArrowBackIcon /></span> <span>Back</span></button>
          <div className="mt-5">
            <div className="">
              <p>Close Account</p>
            </div>
            <div className="mt-2 ">
              <span>Do you want to update your profile notification?</span>
              <div className="mt-5 flex gap-5">
                <button className='p-[5px] w-40 border-[0.5px] border-[#2676C2] text-[#2676c2] bg'>Don't show</button>
                <button className='p-[5px] w-40 text-white bg-[#2676c2]'>Show</button>
              </div>
            </div>
          </div>
        </div>

      </>)
      case 'news reports': return (<>

        <div className="border-[0.5px] border-[#eeeeee]  w-full p-5">
          <button onClick={() => setNotificationSub(null)} className="text-blue-500 cursor-pointer"><span><ArrowBackIcon /></span> <span>Back</span></button>
          <div className="mt-5">
            <div className="">
              <p>Close Account</p>
            </div>
            <div className="mt-2 ">
              <span>Do you want to cahnge your new reports notification?</span>
              <div className="mt-5 flex gap-5">
                <button className='p-[5px] w-40 border-[0.5px] border-[#2676C2] text-[#2676c2] bg'>Don't show</button>
                <button className='p-[5px] w-40 text-white bg-[#2676c2]'>Show</button>
              </div>
            </div>
          </div>
        </div>

      </>)
      case 'proposal': return (<>

        <div className="border-[0.5px] border-[#eeeeee]  w-full p-5">
          <button onClick={() => setNotificationSub(null)} className="text-blue-500 cursor-pointer"><span><ArrowBackIcon /></span> <span>Back</span></button>
          <div className="mt-5">
            <div className="">
              <p>Close Account</p>
            </div>
            <div className="mt-2 ">
              <span>Sure.., do you want to close your SISSOO account</span>
              <div className="mt-5 flex gap-5">
                <button className='p-[5px] w-40 border-[0.5px] border-[#2676C2] text-[#2676c2] bg'>Don't show</button>
                <button className='p-[5px] w-40 text-white bg-[#2676c2]'>Show</button>
              </div>
            </div>
          </div>
        </div>

      </>)
      default: return (

        <>
          <div className="notification-setting border-[0.5px] border-[#eeeeee]">
            <div className="p-3 ext-[18px] font-[400]  text-[#535353]">
              <h3 className='text-[18px] text-[#535353] '>Notification Recieve</h3>
            </div>
            <hr className='border-[0.5px] border-[#eeeeee]' />

            <div className="login-settings cursor-pointer ">
              <div onClick={() => { setNotificationSub('update profile') }} className="messages p-3 h-[55px]  hover:bg-[#f6f6f6] hover:w-full flex items-center justify-between">
                <p className='text-[14px] font-[400] text-[#535353]'>Messages</p>
                <div className="">
                  <NavigateNextIcon sx={{ color: 'gray', fontSize: '30px' }} />
                </div>
              </div>
              <hr className='border-[0.5px] border-[#eeeeee]' />

              <div onClick={() => { setNotificationSub('messages') }} className="update-profile cursor-pointer p-3 h-[55px] hover:bg-[#f6f6f6] hover:w-full flex items-center justify-between">
                <p className='text-[14px] font-[400] text-[#535353]'>Update Profile</p>
                <div className="">
                  <NavigateNextIcon sx={{ color: 'gray', fontSize: '30px' }} />
                </div>
              </div>
              <hr className='border-[0.5px] border-[#eeeeee]' />

              <div onClick={() => { setNotificationSub('news reports') }} className="News-reports cursor-pointer  p-3 h-[55px] hover:bg-[#f6f6f6] hover:w-full flex items-center justify-between">
                <p className='text-[14px] font-[400] text-[#535353]'>News and Reports</p>
                <div className="">
                  <NavigateNextIcon sx={{ color: 'gray', fontSize: '30px' }} />
                </div>
              </div>
              <hr className='border-[0.5px] border-[#eeeeee]' />

              <div onClick={() => { setNotificationSub('proposal') }} className="cursor-pointer  p-3 h-[55px] hover:bg-[#f6f6f6] hover:w-full flex items-center justify-between">
                <p className='text-[14px] font-[400] text-[#535353]'>Proposal</p>
                <div className="">
                  <NavigateNextIcon sx={{ color: 'gray', fontSize: '30px' }} />
                </div>
              </div>
            </div>

          </div>
        </>
      )
    }
  }

  return (

    <>


      {
        activeNotificationSub()
      }
    </>
  )
}

export default EmployerNotifications;