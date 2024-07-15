import React from "react";
import { Link } from "react-router-dom";
const TrainerProposalApplied = ({ training }) => {
  return (
    <>
      {training?.length > 0 ? (
        <>
          {training?.map(
            ({ trainingPostDetails, appliedStatus, applicationstatus }) => {
              return (
                <>
                  <div className="p-[5px]">
                    <div
                      className="flex mt-[2rem] gap-3 items-center  bg-[#fff] stroke-[#eee] stroke-1 shadow-[2px_2px_8px_1px_rgba(199,195,195,0.34)] w-[100%] min-h-[23rem] h-[auto] p-4 rounded-[0.5rem] "
                     
                    >
                      <div className="w-[30%] overflow-y-scroll Scroll h-[20rem]  ">
                        <div className=" h-[100%] w-[100%] flex flex-col gap-2 justify-center pr-1">
                          <div className="">
                            <p className="text-[#333333] font-medium text-base">
                              Training Program Name 
                            </p>
                            <h3 className="text-[15px] font-normal text-[#2676c2] w-[240px]  overflow-hidden text-ellipsis whitespace-nowrap  ">
                              {trainingPostDetails?.trainingName}
                            </h3>
                          </div>
                          <div>
                            <p className="text-[#333333] font-medium text-base">
                              Training Topics & Subjects
                            </p>

                            <div className="capitalize ">
                              {/* <div className="flex gap-1">
                                {trainingPostDetails?.topics
                                  ?.slice(0, 5)
                                  ?.map((items) => (
                                    <h2 className="text-[15px] font-normal text-[#535353] truncate">
                                      {" "}
                                      {items}{" "}
                                    </h2>
                                  ))}
                              </div>
                              <div className="flex gap-1">
  {trainingPostDetails?.topics?.slice(5, 10)?.map((items, index) => (
    <h2 key={index} className="text-[15px] font-normal text-[#535353] truncate">
      {items}{index !== trainingPostDetails?.topics?.slice(5, 10)?.length - 1 ? ', ' : ''}
    </h2>
  ))}
</div> */}

{
                                trainingPostDetails?.topics?.map((items) => <h2 className="text-[15px] font-normal text-[#535353] truncate">{items}</h2>)
                              }


                            </div>
                          </div>
                          <div className="">
                            <p className="text-[#333333] font-medium text-base">
                              Type Of Training
                            </p>
                            <h2 className="text-[15px] font-normal text-[#535353] truncate">
                              {trainingPostDetails?.typeOfTraining}
                            </h2>
                          </div>
                          <div>
                            <p className="text-[#333333] font-medium text-base">
                              Duration Of Training
                            </p>
                            <h2 className="capitalize">
                              {trainingPostDetails?.durationCount}{" "}
                              {trainingPostDetails?.durationType}
                            </h2>
                          </div>
                          <div className="flex w-[90%] justify-between">
                            <div className="">
                              <p className="text-[#333333] font-medium text-base">
                                Start Date
                              </p>
                              <h2 className="text-[15px] font-normal text-[#535353] ">
                                {trainingPostDetails?.startDate}
                              </h2>
                            </div>
                            <div className="">
                              <p className="text-[#333333] font-medium text-base">
                                End Date
                              </p>
                              <h2 className="text-[15px] font-normal text-[#535353] ">
                                {trainingPostDetails?.endDate}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" w-[70%] h-[20rem] rounded-[20px] flex ">
                        <div className="trainer-applied-postedBy w-[35%] h-[100%] bg-[#2676c21a] pl-[10px] flex flex-col justify-center gap-2 rounded-l-lg  ">
                          <div className="flex flex-col gap-2">
                            <h1 className="m-0 text-[#333] text-[1.125rem] not-italic font-[600]">
                              Posted By
                            </h1>
                            <Link
                              to={`/trainerDashboard/proposalmanagement/applied/employerprofilelist/${trainingPostDetails?.postedById}`}
                            >
                              <div className="capitalize bg-[#fff] min-w-[190px] max-w-[80%] h-[4.3rem] rounded-[2.5rem] flex items-center gap-[0.8rem] pl-[0.3rem]  ">
                                {/* <img src={trainingPostDetails?.postedByImg} alt="" style={{ borderRadius: '100%', width: '4rem', height: '4rem' }} /> */}
                                {trainingPostDetails?.postedByImg ? (
                                  <img
                                    src={trainingPostDetails?.postedByImg}
                                    alt={trainingPostDetails?.postedByName[0]}
                                    className="w-[4rem] h-[4rem] rounded-full "
                                    
                                  />
                                ) : (
                                  <div className="flex justify-center items-center bg-[#f4f6f7]  " style={{ borderRadius: '100%', width: '4rem', height: '4rem' }}>
                                    <span className="capitalize">
                                      {trainingPostDetails?.postedByName[0]}
                                    </span>
                                  </div>
                                )}
                                <span className="flex flex-col w-[100%] overflow-hidden ">
                                  <h2 className="text-[#333]  text-[1rem] font-[600]  truncate w-[100px] overflow-hidden text-ellipsis whitespace-nowrap ">
                                    {trainingPostDetails?.postedByName} 
                                  </h2>
                                  <p className="text-[#535353] w-[100px] text-[0.75rem] font-[500] truncate">
                                    {trainingPostDetails?.postedByCompanyName}
                                  </p>
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="">
                            <h2 className="text-[#333] text-[1.125rem] font-[500]">
                              Budget
                            </h2>
                            <h1 className="text-[#2676c2] text-base font-normal w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                              {" "}
                              <span className="">
                                {trainingPostDetails?.selectedCountry === "IND"
                                  ? "₹"
                                  : "$"}
                              </span>{" "}
                              {trainingPostDetails?.maxBudget} -{" "}
                              <span>
                                {trainingPostDetails?.selectedCountry === "IND"
                                  ? "₹"
                                  : "$"}
                              </span>{" "}
                              {trainingPostDetails?.minBudget}/
                              <span className="capitalize">
                                {trainingPostDetails?.durationType?.slice(0, 3)}
                              </span>
                            </h1>
                          </div>
                          <div className=" capitalize">
                            <h2 className="text-[#333] text-[1.125rem] font-[500]">
                              Mode Of Training
                            </h2>
                            <h1 className="text-[#2676c2] text-base font-normal">
                              {trainingPostDetails?.modeOfTraining}
                            </h1>
                          </div>
                        </div>
                        <div className="w-[65%] h-[100%] bg-[#2676c2] rounded-[5px] p-4 flex flex-col items-center justify-center ">
                          <h3 className="text-[#fff] text-[1.3rem] font-[500] ">
                            You're interested in this training, and the request
                            has been successfully submitted! Now, we're awaiting
                            the outcome.
                          </h3>
                          <br />
                          <div className="w-[100%] m-auto flex gap-[1rem]">
                            <div
                              className=""
                              style={
                                appliedStatus === true
                                  ? { visibility: "hidden" }
                                  : null
                              }
                            >
                              <div className="">
                                <h2 className="text-[#2676c2] text-base font-normal w-[9.375rem] h-[1.875rem] bg-[#ffffff] flex items-center justify-center z-[2] mb-3">
                                  {applicationstatus || "Applied"}
                                </h2>
                                <p className="text-[#fff] text-[0.9rem] font-normal ">
                                  You Just Sent a
                                  Request for{" "}
                                  {trainingPostDetails?.postedByName}{" "}
                                </p>
                              </div>
                            </div>
                            <div
                              className=""
                              style={
                                appliedStatus === false
                                  ? { visibility: "hidden" }
                                  : null
                              }
                            >
                              <div className="">
                                <h2 className="bg-[#ffffff] w-[9.375rem] h-[1.875rem] flex items-center justify-center mb-2">
                                  <span
                                    className={`text-base ${
                                      applicationstatus === "Accepted"
                                        ? " text-green-600"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {applicationstatus}
                                  </span>
                                </h2>
                                <p className="text-[#fff] text-[0.9rem] ">
                                  {trainingPostDetails?.postedByName}{" "}
                                  {applicationstatus} Your Request
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          )}
        </>
      ) : (
        <div className=" mt-[20px] flex justify-center items-center bg-[#f4f6f7] h-[300px] w-full rounded-md">
          <span>No Applications Yet!</span>
        </div>
      )}
    </>
  );
};

export default TrainerProposalApplied;
