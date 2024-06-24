import React, { useEffect, useRef, useState } from "react";
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css'
import '../../../styles/Requirements.css';


import { useSelector, useDispatch } from 'react-redux'
import { getPostTrainingRequirementAction, postJobRequirementAction } from "../../../../redux/action/postRequirement.action";
const PostJobSection = () => {


    const [activeOption] = useState("postJob");

    const [content,] = useState("");
    const [contentt, setContentt] = useState("")
    const [contenttt, setContenttt] = useState("")

    const [experience2, setExperience2] = React.useState(0);

    const [isDraggingg, setIsDraggingg] = React.useState(false);

    const postRequiement = useSelector(({ postRequirement }) => {
        return postRequirement;
    })
    console.log("postRequiement", postRequiement)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPostTrainingRequirementAction())
    }, [dispatch])


    const handleExperienceChangee = (event) => {
        setExperience2(event.target.value);
    };
    const handleDragStartt = () => {
        setIsDraggingg(true);
    };
    const handleDragEndd = () => {
        setIsDraggingg(false);
    };
    const showValueLabell = isDraggingg || (experience2 > 0 && !isDraggingg);
    const trackBackgroundd = {
        background: `linear-gradient(to right, #2676C2 0%, #2676C2 ${(experience2 / 50) * 100}%, #d3d3d3 ${(experience2 / 50) * 100}%, #d3d3d3 100%)`,
    };
    useEffect(() => {
        adjustHeight();
    }, [content, contentt, contenttt]);


    const handleChangee = (event) => {
        setContentt(event.target.value);
    };
    const handleChangeee = (event) => {
        setContenttt(event.target.value);
    };


    const adjustHeight = () => {
        if (description.current) {
            description.current.style.height = "2.4rem";
            description.current.style.height = `${description.current.scrollHeight}px`;
        }
        if (description2.current) {
            description2.current.style.height = "46px";
            description2.current.style.height = `${description2.current.scrollHeight}px`;
        }
        if (description3.current) {
            description3.current.style.height = "46px";
            description3.current.style.height = `${description3.current.scrollHeight}px`;
        }
    };


    const qualTopics = [
        { value: 'pg', label: 'Post Graduation PG' },
        { value: 'ug', label: 'Under Graduation UG' },
        { value: 'diplomo', label: 'Diplomo' },
        { value: 'puc', label: 'Pre University College PUC' },
    ]
    const skillsTopics = [
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'c', label: 'c' },
        { value: 'c++', label: 'C++' },
        { value: 'react', label: 'React' },
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'django', label: 'Django' },
        { value: 'express', label: 'Express' }
    ]


    const description = useRef()

    const tocFile = useRef()

    console.log('toc', tocFile)


    const [skilval, setSkillVal] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleTopicChange2 = (options) => {
        setSkillVal(options);
    };

    const handleInputChange = (newValue) => {
        setInputValue(newValue);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            // Add the word as an option
            const newOption = { value: inputValue, label: inputValue };
            setSkillVal([...skilval, newOption]);
            // Clear the input value
            setInputValue('');
        }
    };

    const [qulificationVal, setQulificationVal] = useState([]);
    const handleTopicChange3 = (options) => {
        setQulificationVal(options);
    };

    const description2 = useRef()
    const description3 = useRef()
    const jobTitle = useRef()
    const topics2 = useRef()
    const qualificationRef = useRef()
    const location2 = useRef()
    const salary = useRef()
    const benifit = useRef()

    const handlePostJobReset = () => {

        jobTitle.current.value = '';
        setContentt('')
        setContenttt('')
        salary.current.value = '';
        benifit.current.value = '';
        location2.current.value = '';
        setQulificationVal([]);
        setSkillVal([]);
        setExperience2(0);
    }

    const handlePostJobSubmit = async () => {

        try {
            const formdata2 = {
                jobTitle: jobTitle.current.value,
                description2: description2.current.value,
                description3: description3.current.value,
                salary: salary.current.value,
                benifit: benifit.current.value,
                location2: location2.current.value,
                experience2: experience2,
                qualificationRef: qulificationVal.label,
                topics2: skilval.map((topic) => topic.value)
            }

            await dispatch(postJobRequirementAction(formdata2));
            handlePostJobReset()

        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div className="Requirements">
            <div className="Buttons_Content">
                {activeOption === "postJob" && (
                    <div className="Post_Job_Content">
                        <div className="Content_Title">
                            <p className="mb-[10px]">Job Title</p>
                            <input type="text" ref={jobTitle} placeholder="Enter Job title" />
                        </div>
                        <div className="Training_Description1">
                            <label for="description1">Job Description</label>
                            <textarea
                                ref={description2}
                                className="h-auto"
                                value={contentt}
                                onChange={handleChangee}
                                // onKeyDown={handleKeyDown}
                                id="description1"
                                // value={description}
                                placeholder="Enter Job Description"
                                style={{ borderRadius: '0.4rem', minHeight: "2.4rem", marginTop: '10px' }}
                            />
                        </div>
                        <div className="Content_Title" style={{ width: '41.3rem' }}>
                            <p className="mb-[10px]">Qualifications</p>
                        </div>
                        {/* <div className="w-[41.3rem] pl-[1px] c-[#c7c7c7]"> */}
                        <Select
                            defaultValue={[]}
                            name="Qualifications"
                            options={qualTopics}
                            className="Multiselector"
                            placeholder="Select Qualification"
                            styles={{
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: '#888',
                                }),
                            }}
                            ref={qualificationRef}
                            value={qulificationVal}
                            onChange={handleTopicChange3}
                        />
                        {/* </div> */}
                        <div className="Content_Title">
                            <p className="mb-[10px]">Skills</p>
                        </div>
                        <Select
                            placeholder="Enter What Kind OF Skills You Want"
                            defaultValue={[]}
                            isMulti
                            name="Qualifications"
                            options={skillsTopics}
                            className="Multiselector"
                            styles={{
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: '#888',
                                }),
                            }}
                            value={skilval}
                            onChange={handleTopicChange2}
                            inputValue={inputValue}
                            onInputChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                        />
                        <div className="Select_Experience">
                            <p className="mt-[5px] mb-[5px]">Select Experience</p>
                            <h5 className="mt-[5px] mb-[5px]">Slide To Set Your Experience</h5>
                            <div
                                style={{
                                    width: '40rem',
                                    marginTop: '10px',
                                    position: 'relative',
                                    marginBottom: '15px',
                                }}
                            >
                                <input
                                    type="range"
                                    value={experience2}
                                    onChange={handleExperienceChangee}
                                    onMouseDown={handleDragStartt}
                                    onMouseUp={handleDragEndd}
                                    onTouchStart={handleDragStartt}
                                    onTouchEnd={handleDragEndd}
                                    min={0}
                                    max={50}
                                    aria-label="experience2 Range (Post Job)"
                                    step={1}
                                    style={{
                                        width: '100%',
                                        height: '5px',
                                        cursor: 'pointer',
                                        appearance: 'none',
                                        outline: 'none',
                                        borderRadius: '5px',
                                        zIndex: 1,
                                        ...trackBackgroundd,
                                    }}
                                />
                                {showValueLabell && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '20px',
                                            left: `calc(${(experience2 / 50) * 100}%)`,
                                            transform: 'translateX(-50%)',
                                            textAlign: 'center',
                                            color: '#2676C2',
                                            fontFamily: 'Poppins',
                                            fontSize: '0.855rem',
                                            fontStyle: 'normal',
                                            fontWeight: 'bold',
                                            paddingLeft: '3.1rem',
                                            paddingTop: '0.5rem',
                                        }}
                                    >
                                        {experience2} years
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="Content_Title">
                            <p>Loaction</p>
                            <input type="text" ref={location2} className="mt-[10px]" placeholder="Enter Your Location" />
                        </div>
                        <div className="Content_Title">
                            <p>Salary</p>
                            <input
                                type="text" className="mt-[10px]"
                                placeholder="Enter Salary Details"
                                style={{ width: "41.3rem" }}
                                ref={salary}
                            />
                            <div className="Content_Title" >
                                <p>Benefits</p>
                                <input
                                    type="text" className="mt-[10px]"
                                    placeholder="Enter Benefits"
                                    style={{ width: "41.3rem" }}
                                    ref={benifit}
                                />
                            </div>
                        </div>
                        <div className="Training_Description2">
                            <label for="description2">Company Overview</label>
                            <textarea
                                ref={description3}
                                className="h-auto"
                                value={contenttt}
                                onChange={handleChangeee}
                                // onKeyDown={handleKeyDown}
                                id="description2"
                                // value={description}
                                placeholder="Company Overview Here......"
                                style={{ borderRadius: '0.4rem', minHeight: "2.4rem", marginTop: '10px' }}
                            />
                        </div>

                        {activeOption === "postJob" && (

                            <div className="Post_Button mt-[20px] mb-[20px]">
                                <button
                                    style={{ borderRadius: "5px" }}
                                    className="Reset_Btn flex justify-center items-center"
                                >
                                    <span onClick={handlePostJobReset}>RESET</span>
                                </button>
                                <button onClick={handlePostJobSubmit} style={{ borderRadius: "5px" }} className="Submit_Btn flex justify-center items-center">
                                    <span>SUBMIT</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostJobSection