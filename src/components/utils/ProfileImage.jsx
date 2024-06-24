import React from 'react'


 function ProfileImage ({image,name,w,h,r}) {
    // console.log('w',w,h)
    return (
        <div>
            {
                image?
                <img className={`w-[${w}px] h-[${h}px] rounded-${r}`}  src={image} alt=''/>
                :
                <div className={`flex justify-center items-center w-[${w}px] h-[${h}px] rounded-${r} bg-slate-200`}>
                    <span className='capitalize'>
                        {
                         name?name[0]:''
                        }    
                    </span>
                </div>
            }
        </div>
    )
}

export default  ProfileImage;

