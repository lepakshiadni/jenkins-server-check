import { useEffect, useState } from "react";
import { useRef } from "react";
import EmployerFeedData from './EmployerFeedData'
import EmployerFeedRequestPopUp from "../../../utils/EmployerFeedRequestPopUp";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from '@mui/material/Skeleton';
import { addBookMarkePost, getBookMarkedPost } from "../../../../redux/action/employers.action";

const EmployerFeed = ({ postrainingData }) => {

  const dispatch = useDispatch()

  const employer = useSelector(({ employerSignUp }) => {
    return employerSignUp?.employerDetails?.employerDetails;
  });

  const bookMarkedPost = useSelector(({ employerSignUp }) => {
    return employerSignUp?.addBookMarkedPost?.userBookmarks;
  })

  useEffect(() => {
    dispatch(getBookMarkedPost())
  }, [dispatch])

  const menuRef = useRef(null)
  const [open, setOpen] = useState(Array(postrainingData.length).fill(false));

  const handleMenuClick = (index) => {
    // Toggle the state of the clicked menu
    const updatedOpenState = [...open];
    updatedOpenState[index] = !updatedOpenState[index];
    setOpen(updatedOpenState.map((isOpen, idx) => (idx === index ? isOpen : false)));
  };


  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleIconClick = async (index, bookmark) => {
    await dispatch(addBookMarkePost(bookmark?._id, bookmark))
    setOpen([])
  };

  const [PopUpButton2, setPopUpButton2] = useState(false);

  return (
    <div className="">
      {/* <EmployerFeedRequestPopUp
        trigger={PopUpButton2}
        setTrigger={setPopUpButton2}
      ></EmployerFeedRequestPopUp> */}
      <div className="feed">
        <section className="centered-section">
          <div className="centered-content">
            {
              employer?.basicInfo?.profileImg ?
                <img src={employer?.basicInfo?.profileImg} alt="" />
                :
                <div className='flex justify-center items-center bg-slate-300 rounded-full h-[90px] w-[90px]'>
                  <span className=' items-center text-3xl font-semibold'>
                    {employer?.fullName[0]}
                  </span>
                </div>

            }
            <h3 style={{ marginTop: '15px', fontSize: '20px', color: '#263238' }}>
              {
                employer?.basicInfo?.firstName ?
                  employer?.basicInfo?.firstName + " " + employer?.basicInfo?.lastName
                  :
                  employer?.fullName
              }
            </h3>
            <p style={{ fontSize: "14px", marginTop: "0px", color: "#6A6A6A" }}>
              {employer?.basicInfo?.designation}
            </p>
            {/* <p style={{ fontSize: '12px', marginTop: '10px', color: '#6A6A6A', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>{employer?.skills?.map((data) => (<p className='ms-1'> {data.name} | </p>))}</p> */}
            <p style={{ fontSize: '12px', marginTop: '10px', color: '#6A6A6A', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

              {employer?.skills?.slice(0, 4)?.map(({ name }) => (
                <p className='ms-1'> {name} |</p>
              ))}</p>
            <p style={{ fontSize: '12px', marginTop: '10px', color: '#6A6A6A', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {employer?.skills?.slice(4, 10)?.map(({ name }) => (
                <p className='ms-1'> {name} |</p>
              ))}</p>

          </div>
          <section>
            <h3 style={{ color: '#888888', fontSize: '16px', marginTop: '10px', textAlign: "start" }}>Bookmarked post</h3>

            <section className='scroll' style={{ border: '1px solid #EEEEEE', padding: '10px', height: '300px', marginTop: '10px' }}>

              {
                bookMarkedPost?.postDetails?.length > 0 ? <>
                  {
                    bookMarkedPost?.postDetails?.map((bookmark, index) => (
                      <div key={index}>

                        <div className='bookmark data' style={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: '10px' }}>
                              {/* <img className='img2' src={bookmark.postedByImg} alt="" /> */}
                              {
                                bookmark?.postedByImg ?
                                  <img className='img2' src={bookmark.postedByImg} alt="" />

                                  :
                                  <div className='flex justify-center items-center h-[55px] w-[55px] rounded-full bg-slate-200'>
                                    <span>
                                      {bookmark?.postedByName[0]}
                                    </span>
                                  </div>
                              }
                            </div>
                            <div style={{ textAlign: 'start' }}>
                              <h5 style={{ fontSize: '18px', margin: '0px', color: "#333333" }}>{bookmark.postedByName}</h5>
                              <p style={{ fontSize: '14px', margin: '0px', color: '#535353' }}>{bookmark.postedByCompany}</p>
                            </div>
                          </div>

                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <div
                              onClick={() => handleMenuClick(index)}
                              style={{ cursor: 'pointer', fontSize: '25px', fontWeight: 'bolder', color: 'gray' }}
                            >
                              ⋮
                            </div>
                            {open[index] && (
                              <div
                                ref={menuRef}
                                style={{
                                  position: 'absolute',
                                  top: '100%', // Position below the three dots
                                  left: -100,
                                  background: 'white',
                                  border: '1px solid #ccc',
                                  borderRadius: '5px',
                                  width: '100px',
                                  zIndex: 9999, // Set a high z-index value
                                }}
                              >
                                <div className='option' style={{ padding: '5px', cursor: 'pointer', fontSize: '12px' }}>Connect</div>
                                <div className='option' style={{ padding: '5px', cursor: 'pointer', fontSize: '12px' }} onClick={() => handleIconClick(index, bookmark)}>Remove</div>
                              </div>
                            )}
                          </div>

                        </div>
                        <div>
                          <p style={{ fontSize: '14px', color: '#888888', marginTop: "10px", marginBottom: '10px' }}>
                            {bookmark.postedDescrition}
                          </p>
                          <img width='100%' src={bookmark?.postedImg?.postImg} alt="" />
                        </div>
                        <button onClick={() => { setPopUpButton2(true) }}
                          style={{
                            backgroundColor: '#2676C2',
                            border: '0px',
                            color: 'white',
                            padding: '5px 128px',
                            borderRadius: '10px',
                            fontWeight: 500,
                            marginTop: '10px',
                            display: 'block' // Make it a block-level element
                          }}>Hire</button>
                        <hr style={{ margin: "10px 0px" }} />

                      </div>

                    ))
                  }

                </> : <>
                  {/* <div className='flex gap-2'>
                    <Skeleton variant="circular" width={50} height={50} />
                    <Skeleton variant="text" width={270} sx={{ fontSize: '1rem' }} />
                  </div>
                  <div className='flex flex-col ml-[48px] gap-1 '>
                    <Skeleton className='rounded-sm' variant="rectangular" width={270} height={60} />
                    <Skeleton variant="text" width={270} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" width={270} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" width={270} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" width={270} sx={{ fontSize: '1rem' }} />
                  </div> */}
                  <div className="flex justify-center items-center h-96">
                    <span>
                      No  Bookmarks Found!
                    </span>
                  </div>

                </>
              }

            </section>

          </section>
        </section>

        <section>
          <EmployerFeedData setPopUpButton2={setPopUpButton2} bookMarkedPost={bookMarkedPost} postrainingData={postrainingData} />
        </section>
      </div>
    </div>
  );
};

export default EmployerFeed;
