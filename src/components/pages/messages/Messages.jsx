import React, { useEffect, useState } from 'react';
import Time from 'timesago';
import { useSelector } from 'react-redux';

function Messages({ messages, own, selecteduser }) {
  const [ownUser, setOwnUser] = useState(null);

  const employer = useSelector(({ employerSignUp }) => employerSignUp?.employerDetails);
  const trainer = useSelector(({ trainerSignUp }) => trainerSignUp?.trainerDetails);

  useEffect(() => {
    if (employer?.success) {
      setOwnUser(employer?.employerDetails);
    }
    if (trainer?.success) {
      setOwnUser(trainer?.trainerDetails);
    }
  }, [employer, trainer]);

  const timeAgo = Time(messages?.createdAt);

  return (
    <div>
      {own ? (
        <div className="flex flex-row-reverse gap-4 mr-[21px] space-y-1 mb-[20px] items-center">
          <div>
            {ownUser?.basicInfo?.profileImg ? (
              <img
                className="w-[40px] h-[40px] rounded-full"
                src={ownUser?.basicInfo?.profileImg}
                alt=""
              />
            ) : (
              <div className='w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-500'>
                <p className="text-lg">{ownUser?.fullName[0]}</p>
              </div>
            )}
          </div>
          <div className="w-auto">
            <div className="text-white text-xs font-normal bg-[#2676c2] text-end rounded-tl-lg rounded-tr-[20px] rounded-bl-lg flex justify-end pr-[10px] h-9 items-center">
              {messages?.text}
            </div>
            <div className="messageBottom text-zinc-400 text-end mt-[5px] text-[10px]">
              {timeAgo}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex ml-[21px] space-x-1 mb-[20px]">
          <div>
            {selecteduser?.basicInfo?.profileImg ? (
              <img
                className="w-[40px] h-[40px] rounded-full mt-[10px]"
                src={selecteduser?.basicInfo?.profileImg}
                alt=""
              />
            ) : (
              <div className='w-[40px] h-[40px] rounded-full mt-[10px] flex justify-center items-center bg-slate-500'>
                <p className="text-lg">{selecteduser?.fullName[0]}</p>
              </div>
            )}
          </div>
          <div>
            <div className="w-full h-9 bg-zinc-100 rounded-tl-[20px] rounded-tr-lg rounded-br-lg border border-gray-200 flex items-center px-2">
              <div className="text-neutral-500 text-xs font-normal">
                {messages?.text}
              </div>
            </div>
            <div className="messageBottom text-zinc-400 text-[10px] ml-2">
              {timeAgo}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
