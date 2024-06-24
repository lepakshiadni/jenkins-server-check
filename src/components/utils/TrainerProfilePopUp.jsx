import { useState, useEffect } from 'react'
import Axios from 'axios';
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {useParams} from 'react-router-dom'

function TrainerProfile({ trigger, setTrigger,id }) {
    const baseUrl = process.env.REACT_APP_API_URL;
    const [seletedUser, setSeletedUser] = useState(null)
    const [feedBack, setFeedBack] = useState()
    const [showAllReviews, setShowAllReviews] = useState(false);
  
    console.log('userId form ppu',id)
    useEffect(() => {
        Axios.get(`${baseUrl}/employer/getTrainerDetailsById/${id}`)
            .then((resp) => {
                setSeletedUser(resp.data?.trainerDetails)
                setFeedBack(resp.data?.findFeedBack?.[0])

            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return trigger ? (
        <div className='w-full h-[100vh]  fixed top-0 left-0 bg-[#00000080] z-[50000] flex justify-center items-center'>
            <div className='bg-[#ffff] w-[900px] h-[95vh] rounded-[15px] p-[15px]'>
                <div className='flex justify-end'>
                    <span className='hover:bg-blue-100 rounded-full p-1' onClick={() => setTrigger(!trigger)}>
                        <svg className="popconnection cursor-pointer rounded-full" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 34 34" fill="none">
                            <path d="M8.48542 8.48528L16.9707 16.9706M16.9707 16.9706L25.456 25.4558M16.9707 16.9706L8.48542 25.4558M16.9707 16.9706L25.456 8.48528" stroke="#2676C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
                <div>
                    <section className='flex w-full gap-3'>
                        <section className='w-6/12'>

                            <section className='min-h-[150px] h-auto border border-[#EEEEEE]'>
                                <div className="">

                                    {
                                        seletedUser?.basicInfo?.profileBanner ?
                                            <img className="w-full h-[90px]" src={seletedUser?.basicInfo?.profileBanner} />
                                            :
                                            <div className="w-full h-[90px] bg-slate-300">
                                                <span></span>
                                            </div>
                                    }
                                    <div
                                        className="flex items-end relative ms-12 h-[100px] "
                                        style={{ top: "-20px" }}
                                    >
                                        {
                                            seletedUser?.basicInfo?.profileImg ?
                                                <img
                                                    style={{ borderRadius: "10px" }}
                                                    height="100px"
                                                    width="90px"
                                                    src={seletedUser?.basicInfo?.profileImg}
                                                    alt=""
                                                    className="absolute top-[0]"
                                                />

                                                :
                                                <div className="flex justify-center items-center h-[100px] w-[90px] bg-slate-400 rounded-[10px] absolute top-0">
                                                    <span className="capitalize text-3xl">{seletedUser?.fullName?.[0]}</span>
                                                </div>
                                        }

                                        <div className="absolute left-[120px]">
                                            <h3
                                                style={{
                                                    fontSize: "20px",
                                                    fontWeight: "500",
                                                    color: "#2676C2",
                                                }}
                                            >
                                                {seletedUser?.fullName}
                                            </h3>
                                            <p
                                                style={{
                                                    fontSize: "16px",
                                                    fontWeight: "400",
                                                    color: "#6A6A6A",
                                                }}
                                            >
                                                {seletedUser?.basicInfo?.designation || "Not Available"}
                                            </p>

                                            <Rating
                                                name="half-rating-read"
                                                max={5}
                                                icon={<StarIcon sx={{ color: "#FFDE30", fontSize: 25 }} />}
                                                emptyIcon={
                                                    <StarBorderIcon sx={{ fontSize: 25, color: "#FFDE30" }} />
                                                }
                                                precision={0.1}
                                                defaultValue={feedBack?.averageRating}
                                                readOnly
                                            />

                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className='trainerPopupScroll border border-[#EEEEEE] h-[49vh]  mt-[5px] overflow-y-scroll'>
                                <div className=''>

                                    <div className="p-[10px]">
                                        {
                                            seletedUser?.skills?.length > 0 ?
                                                <>
                                                    {seletedUser?.skills.map((val, index) => {
                                                        return (
                                                            <div className="flex mb-5 gap-2" key={index}>

                                                                {!val.image ? (
                                                                    <h3 style={{ padding: '6px 12px', fontWeight: 600, backgroundColor: 'gray', color: '#FFFF' }}>
                                                                        {val?.name[0]}
                                                                    </h3>
                                                                ) : (
                                                                    <img className="w-[38px] h-[38px]" src={val.image} alt="" />
                                                                )}
                                                                <div className="w-full text-end">
                                                                    <h6
                                                                        style={{
                                                                            fontSize: "16px",
                                                                            fontWeight: "400",
                                                                            color: "#6A6A6A",
                                                                        }}
                                                                        className=' space-x-1'
                                                                    >{`${val.name}`}<span className='text-[#2676c2]'> {`${val?.range === undefined ? '' : val?.range}`}</span><span className='text-[#2676c2]'>Years</span></h6>

                                                                    <div
                                                                        className=""
                                                                        style={{
                                                                            background: "#ddd",
                                                                            borderRadius: "5px",
                                                                            height: "8px",
                                                                            width: "100%", // Set default width
                                                                            overflow: "hidden", // Hide overflowing content
                                                                        }}
                                                                    >
                                                                        <div
                                                                            className=" fill w-full rounded-[5px] "
                                                                            style={{
                                                                                // "--width": `${val ? (val.range / 15) * 100 + "%" : "0"}`,
                                                                                "--width": `${val.range ? ((val.range / 18) * 100 > 50 ? 100 - ((val.range / 15) * 100 - 50) * 2 : (val.range / 15) * 100) + "%" : "0"}`,
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </> :
                                                null
                                        }
                                    </div>
                                </div>
                            </section>

                        </section>
                        <section className='w-6/12 border border-[#EEEEEE]'>
                            <div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <h3
                                            style={{
                                                color: "#232323",
                                                fontSize: "16px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            About {seletedUser?.fullName}
                                        </h3>
                                        {/* <div className="flex items-center">

                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <div
                    ref={menuRef}
                    onClick={() => {
                      setOpen(!open);
                    }}
                    style={{
                      cursor: "pointer",
                      fontSize: "25px",
                      fontWeight: "bolder",
                      color: "gray",
                    }}
                  >
                    ⋮
                  </div>
                  {open && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        zIndex: 1,
                        width: "100px",
                      }}
                    >
                      <div
                        className="option"
                        style={{
                          padding: "5px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Connect
                      </div>
                      <div
                        className="option"
                        style={{
                          padding: "5px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Not Connect
                      </div>
                    </div>
                  )}
                </div>
              </div> */}
                                    </div>
                                    <h3
                                        style={{
                                            color: "#535353",
                                            fontSize: "13px",
                                            fontWeight: "500",
                                            marginTop: "20px",
                                        }}
                                    >
                                        {seletedUser?.basicInfo?.aboutYou || "Not  Available"}


                                    </h3>
                                    <p
                                        style={{
                                            color: "#535353",
                                            fontSize: "13px",
                                            fontWeight: "400",
                                            marginTop: "20px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {" "}
                                        {seletedUser?.basicInfo?.objective}
                                    </p>
                                    {/* <div>
                                        <h6
                                            style={{
                                                fontSize: "16px",
                                                color: "#232323",
                                                fontWeight: "500",
                                                marginTop: "20px",
                                            }}
                                        >
                                            Certifications
                                        </h6>
                                        {
                                            seletedUser?.certificateDetails?.length > 0 ?
                                                <>

                                                    {seletedUser?.certificateDetails?.map(({ certification, certificateHead, certificateUrl, certificationDescription, institution }, index) => (
                                                        <div key={index}>
                                                            <h6
                                                                style={{
                                                                    fontSize: "14px",
                                                                    color: "#535353",
                                                                    fontWeight: "500",
                                                                    marginTop: "10px",
                                                                }}
                                                            >
                                                                {certificateHead}
                                                            </h6>
                                                            <p
                                                                style={{
                                                                    fontSize: "14px",
                                                                    color: "#535353",
                                                                    fontWeight: "400",
                                                                    marginTop: "20px",
                                                                }}
                                                            >
                                                                {certificationDescription}
                                                            </p>

                                                            {certificateUrl.toLowerCase().endsWith('.pdf') ? (
                                                                <iframe
                                                                    title="Certificate"
                                                                    style={{ width: '100%', height: '417px' }}
                                                                    className="mt-7 h-[221px] w-[500px]" src={certificateUrl} alt="PDF Certificate" />
                                                            ) : (
                                                                <img className="mt-[20px]" src={certificateUrl} alt="Image Certificate" />
                                                            )}
                                                            <hr className="m-3" />
                                                        </div>
                                                    ))}
                                                </>
                                                :
                                                <div>
                                                    <span>
                                                        No Certifications
                                                    </span>

                                                </div>
                                        }
                                    </div> */}
                                </div>
                                <hr className="mt-3 mb-2" />
                                <div className="p-2">
                                    <h3
                                        style={{
                                            fontSize: "16px",
                                            color: "#232323",
                                            fontWeight: "500",
                                            // marginBottom: "40px",
                                        }}
                                    >
                                        Feedback & Reviews
                                    </h3>
                                    {
                                        feedBack?.feedBackDetails?.length > 0
                                            ?
                                            <>
                                                {
                                                    feedBack?.feedBackDetails?.
                                                        slice(0, showAllReviews ? undefined : 2)
                                                        ?.map((review, index) => (
                                                            <div className="flex items-start" key={index}>
                                                                <img
                                                                    style={{
                                                                        borderRadius: "50px",
                                                                        height: "50px",
                                                                        width: "50px",
                                                                        overflow: "hidden",
                                                                    }}
                                                                    src={review?.reviewedByImg}
                                                                    alt=""
                                                                />
                                                                <div className="ms-3">
                                                                    <h6
                                                                        style={{
                                                                            fontSize: "16px",
                                                                            color: "#232323",
                                                                            fontWeight: "400",
                                                                        }}
                                                                    >
                                                                        {review?.reviewedByName}
                                                                    </h6>
                                                                    <p
                                                                        style={{
                                                                            fontSize: "14px",
                                                                            color: "#535353",
                                                                            fontWeight: "500",
                                                                        }}
                                                                    >
                                                                        {review?.reviewedByDesignation}
                                                                    </p>
                                                                    <span>
                                                                        <Rating
                                                                            name="half-rating-read"
                                                                            max={5}
                                                                            icon={<StarIcon style={{ color: "#FFDE30" }} />}
                                                                            emptyIcon={
                                                                                <StarBorderIcon style={{ color: "#FFDE30" }} />
                                                                            }
                                                                            precision={0.1}
                                                                            defaultValue={review?.rating}
                                                                            readOnly
                                                                        />
                                                                    </span>
                                                                    <p
                                                                        style={{
                                                                            fontSize: "14px",
                                                                            color: "#535353",
                                                                            fontWeight: "400",
                                                                        }}
                                                                    >
                                                                        {review?.feedBack}
                                                                    </p>
                                                                    <hr className="mt-4 mb-4" />
                                                                </div>
                                                            </div>
                                                        ))
                                                }
                                                {feedBack?.reviews?.length > 2 && (
                                                    <h6
                                                        style={{
                                                            color: "#2676C2",
                                                            fontSize: "16px",
                                                            fontWeight: "500",
                                                            cursor: "pointer",
                                                            textAlign: "end",
                                                        }}
                                                        onClick={() => setShowAllReviews(!showAllReviews)}
                                                    >
                                                        {showAllReviews ? "Less feedback" : "More feedback"}
                                                    </h6>
                                                )}

                                            </>
                                            :
                                            <div className="w-full h-[100px] flex justify-center items-center">
                                                <span>
                                                    No Reviews
                                                </span>
                                            </div>
                                    }
                                </div>
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        </div >


    )
        :
        null
}

export default TrainerProfile