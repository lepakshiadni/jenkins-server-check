import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "../../styles/TrainerHelpSupport.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SissoAssistent from "./sissoassit/SissoAssistant";
import { useNavigate } from "react-router-dom";

function EmployerHelpSupport() {
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate()

  const [filterText, setFilterText] = useState("");

  const dropRegf = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (dropRegf.current && !dropRegf.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [dropRegf]);

  const helpArticles = [
    "What is Sissoo, and how can it benefit me?",
    "How do I create a Sissoo account?",
    "Is Sissoo available for both iOS and Android devices?",
    "Can I log in using my social media accounts on Sissoo?",
    "Is my data secure on Sissoo?",
  ];

  const filteredArticles = helpArticles.filter((article) =>
    article.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="trinersHelp ">

      <div>
        <div>
          <div
            className="flex items-center relative"
            style={{ border: "2px solid #D1D1D1", borderRadius: "5px" }}
          >
            <svg
              className="ms-4"
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M17 17L25 25M10.3333 19.6667C5.17868 19.6667 1 15.488 1 10.3333C1 5.17868 5.17868 1 10.3333 1C15.488 1 19.6667 5.17868 19.6667 10.3333C19.6667 15.488 15.488 19.6667 10.3333 19.6667Z"
                stroke="#888888"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <input
              style={{
                width: "100%",
                height: "50px",
                color: "#888888",
                borderLeft: "none",
                cursor: "pointer",
              }}
              className="ps-3 outline-none "
              type="text"
              placeholder="Search help articles by keywords"
              onChange={(e) => setFilterText(e.target.value)}
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <div onClick={()=>{setSearchOpen(false)}} className="absolute w-full top-[51px] z-[1000]">
              {searchOpen ? (
                <div
                  className="searchMenu"
                  style={{
                    width: "100%",
                    zIndex: "10",
                    border: "2px soild  #D1D1D1",
                  }}
                >
                  {filteredArticles.map((article, index) => (
                    <h3 key={index}>{article}</h3>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div
            style={{
              backgroundColor: "rgba(38, 118, 194, 0.2)",
              width: "259px",
              height: "120px",
              borderRadius: "8px",
              borderWidth: "1px",
            }}
            className="helpMenu me-5 mt-5"
            onClick={() => navigate('sissoo-basics')}
          >
            <div
              style={{ paddingLeft: "13px", paddingTop: "20px" }}
              className="flex items-start"
            >
              <div style={{ width: "36px", height: "36px" }}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <circle cx="18" cy="18" r="18" fill="#2676C2" />
                  </svg>
                  <img
                    height="36px"
                    width="36px"
                    src="https://s3-alpha-sig.figma.com/img/5491/d762/a502ef7ee1a73d1205a5f9ed7f707a64?Expires=1704672000&Signature=lIp8QSQWQg~kjwTxpRtPNJ25iRMyxO~ulvEk7zz9B3U179FVRW3mhalY5VRyr3cnUyutysK6fBus6YsP81EHOYrGQL2Z3rdlBEAJLa9Dk9uTTIK0c7x9lJZvs4U2t6EQGpHHceQ5jIoK8yu5sOIf3oVCSa4E0tg-r-42f8JBPh7oGuBxOk9M5~6Q77blXeym0OiFeDnVkG~TZNaDAMV7XqXQBksLYSB2JTK~5bCH66wJUN-YuhPz77yWf-YLgWYpT3Fq3jpsh~QaOjIGNp2Sep7OuX0SEc9YhFkgVzbof~Zqhl1Vku--3UWpsVCNEiB-aRP1PxecoLOj4m3Td8I~2A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    alt="background"
                    style={{
                      transform: "translate(15%, -120%)",
                      borderRadius: "50%",
                      objectFit: "cover",
                      filter: "brightness(0) invert(1)",
                      width: "28px",
                      height: "26px",
                    }}
                  />
                </div>
              </div>
              <div style={{ color: "#2676C2", marginLeft: "14px" }}>
                <h6 style={{ fontSize: "16px", fontWeight: "500" }}>
                  Sissoo Basics
                </h6>
                <p style={{ fontSize: "12px", fontWeight: "400" }}>
                  Welcome to Sissoo, your go-to <br /> application.
                </p>
              </div>
            </div>
          </div>

          <div
          
            style={{
              backgroundColor: "rgba(38, 118, 194, 0.2)",
              width: "259px",
              height: "120px",
              borderRadius: "8px",
              borderWidth: "1px",
            }}
            className="helpMenu me-5 mt-5"
            onClick={() => navigate('account & network')}
          >
            <div
              style={{ paddingLeft: "13px", paddingTop: "20px" }}
              className="flex items-start"
            >
              <div style={{ width: "36px", height: "36px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <circle cx="18" cy="18" r="18" fill="#2676C2" />
                  <path
                    d="M18 18C16.625 18 15.4479 17.5104 14.4688 16.5312C13.4896 15.5521 13 14.375 13 13C13 11.625 13.4896 10.4479 14.4688 9.46875C15.4479 8.48958 16.625 8 18 8C19.375 8 20.5521 8.48958 21.5312 9.46875C22.5104 10.4479 23 11.625 23 13C23 14.375 22.5104 15.5521 21.5312 16.5312C20.5521 17.5104 19.375 18 18 18ZM8 28V24.5C8 23.7917 8.18229 23.1406 8.54688 22.5469C8.91146 21.9531 9.39583 21.5 10 21.1875C11.2917 20.5417 12.6042 20.0573 13.9375 19.7344C15.2708 19.4115 16.625 19.25 18 19.25C19.375 19.25 20.7292 19.4115 22.0625 19.7344C23.3958 20.0573 24.7083 20.5417 26 21.1875C26.6042 21.5 27.0885 21.9531 27.4531 22.5469C27.8177 23.1406 28 23.7917 28 24.5V28H8Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div style={{ color: "#2676C2", marginLeft: "14px" }}>
                <h6 style={{ fontSize: "16px", fontWeight: "500" }}>
                  Account & Network
                </h6>
                <p style={{ fontSize: "12px", fontWeight: "400" }}>
                  Empowering Account <br />
                  Management and Network <br />
                  Growth.
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(38, 118, 194, 0.2)",
              width: "259px",
              height: "120px",
              borderRadius: "8px",
              borderWidth: "1px",
            }}
            className="helpMenu me-5 mt-5 "
            onClick={() => navigate('profile-management')}
          >
            <div
              style={{ paddingLeft: "13px", paddingTop: "20px" }}
              className="flex items-start"
            >
              <div style={{ width: "36px", height: "36px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <circle cx="18" cy="18" r="18" fill="#2676C2" />
                  <path
                    d="M18 28V25.7778H25.7778V10.2222H18V8H25.7778C26.3889 8 26.912 8.21759 27.3472 8.65278C27.7824 9.08796 28 9.61111 28 10.2222V25.7778C28 26.3889 27.7824 26.912 27.3472 27.3472C26.912 27.7824 26.3889 28 25.7778 28H18ZM15.7778 23.5556L14.25 21.9444L17.0833 19.1111H8V16.8889H17.0833L14.25 14.0556L15.7778 12.4444L21.3333 18L15.7778 23.5556Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div style={{ color: "#2676C2", marginLeft: "14px" }}>
                <h6 style={{ fontSize: "16px", fontWeight: "500" }}>
                  Profile Management
                </h6>
                <p style={{ fontSize: "12px", fontWeight: "400" }}>
                  Effortlessly manage your profile with our intuitive tools
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(38, 118, 194, 0.2)",
              width: "259px",
              height: "120px",
              borderRadius: "8px",
              borderWidth: "1px",
            }}
            className="helpMenu mt-5 me-5"
            onClick={() => navigate('sissoo-benifits')}
          >
            <div
              style={{ paddingLeft: "13px", paddingTop: "20px" }}
              className="flex items-start"
            >
              <div style={{ width: "36px", height: "36px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <circle cx="18" cy="18" r="18" fill="#2676C2" />
                  <path
                    d="M8 18.3737H7.9V18.4737V24.8772C7.9 25.4269 8.08521 25.8911 8.4567 26.2626L8.52741 26.1919L8.4567 26.2626C8.82821 26.6341 9.29239 26.8193 9.84212 26.8193H18.5263H18.6263V26.7193V25.5789V25.4789H18.5263H9.84212C9.69789 25.4789 9.56142 25.42 9.43038 25.2889C9.29934 25.1579 9.24038 25.0214 9.24038 24.8772V18.4737V18.3737H9.14038H8ZM12.2983 14.0754H12.1983V14.1754V20.579C12.1983 21.1287 12.3835 21.5929 12.755 21.9643C13.1264 22.3358 13.5906 22.521 14.1403 22.521H22.8246H22.9246V22.421V21.2807V21.1807H22.8246H14.1403C13.9961 21.1807 13.8597 21.1217 13.7286 20.9907C13.5976 20.8596 13.5386 20.7232 13.5386 20.579V14.1754V14.0754H13.4386H12.2983ZM17.7368 12.5211H17.8368H17.7368ZM17.0532 9.4567L17.1239 9.52741L17.0532 9.4567C16.6817 9.82821 16.4965 10.2924 16.4965 10.8421V16.2807C16.4965 16.8304 16.6817 17.2946 17.0532 17.6661C17.4247 18.0376 17.8889 18.2228 18.4386 18.2228H26.1579C26.7076 18.2228 27.1718 18.0376 27.5433 17.6661C27.9148 17.2946 28.1 16.8304 28.1 16.2807V10.8421C28.1 10.2924 27.9148 9.82821 27.5433 9.4567L27.4726 9.52741L27.5433 9.4567C27.1718 9.08521 26.7076 8.9 26.1579 8.9H18.4386C17.8889 8.9 17.4247 9.08521 17.0532 9.4567ZM26.5696 16.6924L26.6403 16.7632L26.7596 12.5211V16.2807C26.7596 16.4249 26.7007 16.5614 26.5696 16.6924Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.2"
                  />
                </svg>
              </div>
              <div style={{ color: "#2676C2", marginLeft: "14px" }}>
                <h6 style={{ fontSize: "16px", fontWeight: "500" }}>
                  Sissoo Benefits
                </h6>
                <p style={{ fontSize: "12px", fontWeight: "400" }}>
                  Empower your hiring with Sissoo
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(38, 118, 194, 0.2)",
              width: "259px",
              height: "120px",
              borderRadius: "8px",
              borderWidth: "1px",
            }}
            className="helpMenu me-5 mt-5"
            onClick={() => navigate('sissoo-support')}

          >
            <div
              style={{ paddingLeft: "13px", paddingTop: "20px" }}
              className="flex items-start"
            >
              <div style={{ width: "36px", height: "36px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <circle cx="18" cy="18" r="18" fill="#2676C2" />
                  <path
                    d="M20 21C20.2833 21 20.5292 20.8958 20.7375 20.6875C20.9458 20.4792 21.05 20.2333 21.05 19.95C21.05 19.6667 20.9458 19.4208 20.7375 19.2125C20.5292 19.0042 20.2833 18.9 20 18.9C19.7167 18.9 19.4708 19.0042 19.2625 19.2125C19.0542 19.4208 18.95 19.6667 18.95 19.95C18.95 20.2333 19.0542 20.4792 19.2625 20.6875C19.4708 20.8958 19.7167 21 20 21ZM19.25 17.8H20.75C20.75 17.3167 20.8 16.9625 20.9 16.7375C21 16.5125 21.2333 16.2167 21.6 15.85C22.1 15.35 22.4333 14.9458 22.6 14.6375C22.7667 14.3292 22.85 13.9667 22.85 13.55C22.85 12.8 22.5875 12.1875 22.0625 11.7125C21.5375 11.2375 20.85 11 20 11C19.3167 11 18.7208 11.1917 18.2125 11.575C17.7042 11.9583 17.35 12.4667 17.15 13.1L18.5 13.65C18.65 13.2333 18.8542 12.9208 19.1125 12.7125C19.3708 12.5042 19.6667 12.4 20 12.4C20.4 12.4 20.725 12.5125 20.975 12.7375C21.225 12.9625 21.35 13.2667 21.35 13.65C21.35 13.8833 21.2833 14.1042 21.15 14.3125C21.0167 14.5208 20.7833 14.7833 20.45 15.1C19.9 15.5833 19.5625 15.9625 19.4375 16.2375C19.3125 16.5125 19.25 17.0333 19.25 17.8ZM14 24C13.45 24 12.9792 23.8042 12.5875 23.4125C12.1958 23.0208 12 22.55 12 22V10C12 9.45 12.1958 8.97917 12.5875 8.5875C12.9792 8.19583 13.45 8 14 8H26C26.55 8 27.0208 8.19583 27.4125 8.5875C27.8042 8.97917 28 9.45 28 10V22C28 22.55 27.8042 23.0208 27.4125 23.4125C27.0208 23.8042 26.55 24 26 24H14ZM10 28C9.45 28 8.97917 27.8042 8.5875 27.4125C8.19583 27.0208 8 26.55 8 26V12H10V26H24V28H10Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div style={{ color: "#2676C2", marginLeft: "14px" }}>
                <h6 style={{ fontSize: "16px", fontWeight: "500" }}>Help&Support </h6>
                <p style={{ fontSize: "12px", fontWeight: "400" }}>
                  We provided a frequently asked <br />
                  questions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div onClick={()=>{setSearchOpen(false)}}>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "500",
              margin: "10px 0px",
            }}
          >
            Most Asked FAQ’s
          </h3>
          <div
            style={{
              height: "400px",
              width: "100%",
              border: "1px solid #D1D1D1",
              borderRadius:'8px'
            }}
          >
            <div className="questionMenu" onClick={() => navigate("sissoo-support")}>
              <h6>What Is Sissoo, And How Can It Benefit Me? </h6>

              <ArrowForwardIosIcon />
            </div>
            <hr />
            <div className="questionMenu" onClick={() => navigate("sissoo-support", { state: { selectedOption: 1 } })}>
              <h6>Is Sissoo available for both iOS and Android devices?</h6>

              <ArrowForwardIosIcon />
            </div>
            <hr />
            <div className="questionMenu" onClick={() => navigate("sissoo-support", { state: { selectedOption: 2 } })}>
              <h6>What features does Sissoo Offers to users?</h6>

              <ArrowForwardIosIcon />
            </div>
            <hr />
            <div className="questionMenu" onClick={() => navigate("sissoo-support", { state: { selectedOption: 3 } })}>
              <h6>How Do I hire trainers from trainer list?</h6>

              <ArrowForwardIosIcon />
            </div>
            <hr />
            <div className="questionMenu" onClick={() => navigate("sissoo-support", { state: { selectedOption: 4 } })}>
              <h6>Is My Data Secure On Sissoo? </h6>

              <ArrowForwardIosIcon />
            </div>
            <hr />
            <div className="questionMenu" onClick={() => navigate("sissoo-support", { state: { selectedOption: 5 } })}>
              <h6>What is Proposal option in Proposal Management?</h6>

              <ArrowForwardIosIcon />
            </div>
            <hr />
            <div className="questionMenu" onClick={() => navigate("sissoo-support", { state: { selectedOption: 6 } })}>
              <h6>How to search trainers?</h6>

              <ArrowForwardIosIcon />
            </div>
          </div>
          <div>
            <SissoAssistent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerHelpSupport;
