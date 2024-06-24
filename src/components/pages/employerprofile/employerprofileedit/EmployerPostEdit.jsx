import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployerPost } from '../../../../redux/action/postRequirement.action';
import Select from 'react-select';
 
const EmployerPostEdit = (props) => {
 
    const postEditDetails = props.postDetails
    console.log('postEditDetails', postEditDetails);
 
    let states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Delhi",
        "Ladakh",
        "Lakshadweep",
        "Puducherry"
    ];
 
    const [trainingName, setTrainingName] = useState(postEditDetails?.trainingName || "")
    const [description, setDescription] = useState(postEditDetails?.description || "")
    const [typeOfTraining, setTrainingType] = useState(postEditDetails?.typeOfTraining || "");
    const [location, setLocation] = useState(postEditDetails?.location || "")
    const [startDate, setStartDate] = useState(postEditDetails?.startDate || null);
    const [endDate, setEndDate] = useState(postEditDetails?.endDate || null);
    const [modeOfTraining, setTrainingMode] = useState(postEditDetails?.modeOfTraining || "");
    const [durationType, setDurationType] = useState(postEditDetails?.durationType || "");
    const [durationCount, setDurationCount] = useState(postEditDetails?.durationCount || 0);
    const [selectedCountry, setSelectedCountry] = useState(postEditDetails?.selectedCountry || "IND");
    const [minBudget, setMinBudget] = useState(postEditDetails?.minBudget || "");
    const [maxBudget, setMaxBudget] = useState(postEditDetails?.maxBudget || "");
 
    // const [topics, setTopics] = useState(postEditDetails?.topics?.map((val) => val) || [])
    const [tocFile, setTocFile] = useState('')
    // console.log('file', tocFile)
 
    useLayoutEffect(() => {
        if (postEditDetails) {
            setTrainingName(postEditDetails?.trainingName)
            setDescription(postEditDetails?.description)
            setTrainingType(postEditDetails?.typeOfTraining)
            setLocation(postEditDetails?.location)
            setStartDate(postEditDetails?.startDate)
            setEndDate(postEditDetails?.endDate)
            setTrainingMode(postEditDetails?.modeOfTraining)
            setDurationType(postEditDetails?.durationType)
            setDurationCount(postEditDetails?.durationCount)
            setSelectedCountry(postEditDetails?.selectedCountry)
            setMinBudget(postEditDetails?.minBudget)
            setMaxBudget(postEditDetails?.maxBudget)
            setTopics(postEditDetails?.topics?.map((val) => val))
        }
    }, [postEditDetails]);
 
    const dispatch = useDispatch()
 
    const handleUpdate = async (postId) => {
        let formData = new FormData();
 
        // Append fields to FormData
        formData.append("trainingName", trainingName);
        formData.append("description", description);
 
        formData.append("topics", JSON.stringify(topics));
        formData.append("typeOfTraining", typeOfTraining);
        formData.append("modeOfTraining", modeOfTraining);
        formData.append("location", location);
        formData.append("minBudget", minBudget);
        formData.append("maxBudget", maxBudget);
        formData.append("durationType", durationType);
        formData.append("durationCount", durationCount);
        formData.append("selectedCountry", selectedCountry);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
 
        // Append file to FormData
        // if (tocFile.current && tocFile.current.files.length > 0) {
        //     console.log("tocFile", tocFile.current.files[0])
        //     formData.append("tocFile", tocFile.current.files[0], tocFile.current?.files[0]?.name);
        // }
        if (tocFile) {
            // console.log('tocFile ', tocFile)
            formData.append("tocFile", tocFile)
        }
 
        dispatch(updateEmployerPost(postId, formData))
        props.setTrigger(false)
    }
 
    const placeholders = {
        IND: '₹',
        USA: '$'
    };
 
    const descriptionVal = useRef()
    const handleChange = (event) => {
        setDescription(event.target.value);
        adjustHeight(); // Ensure height adjustment is triggered on change
    };
 
    const adjustHeight = () => {
        if (descriptionVal.current) {
            descriptionVal.current.style.height = "2.4rem"; // Reset height
            descriptionVal.current.style.height = `${descriptionVal.current.scrollHeight}px`; // Set new height
        }
    };
 
    useEffect(() => {
        adjustHeight(); // Initial adjustment
    }, [description]);
 
    const [topics, setTopics] = useState(postEditDetails?.topics?.map((val) => val) || [])
    console.log('initialTopics', topics);
    const [newSkill, setNewSkill] = useState('');
 
    const topTopics = [
        'Python',
        'Java',
        'C',
        'C++',
        'React',
        'HTML',
        'CSS',
        'Django',
        'Express'
    ];
 
    const handleAddNewSkill = () => {
        if (newSkill.trim() !== '') {
            if (!topics.includes(newSkill.trim())) {
                setTopics(prevTopics => [...prevTopics, newSkill.trim()]);
            }
            setNewSkill('');
        }
    };
 
    const handleInputChange = (inputValue) => {
        setNewSkill(inputValue);
    };
 
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default Enter behavior
            handleAddNewSkill();
        }
    };
 
    return props.trigger ? (
        <div className="postEditPop flex justify-center items-center">
            <div className='w-full max-w-[60%] h-[80vh]  p-[20px] border border-gray-300 bg-[#ffff] rounded-[10px] overflow-y-auto'>
                <div className='mb-3'>
                    <label >TrainingName : </label><br />
                    <input style={{ padding: '8px', color: '#333333' }} type="text" value={trainingName}
                        onChange={(e) => setTrainingName(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="">Descripton :</label><br />
                    <textarea ref={descriptionVal} name="" id="" cols="30" rows="1" type='text' value={description} onChange={(e) => handleChange(e)}></textarea>
                </div>
 
                <Select
                    isMulti
                    name="colors"
                    options={topTopics.map(topic => ({ value: topic, label: topic }))}
                    className="Multiselector"
                    placeholder="Select Training Topics"
                    styles={{
                        placeholder: (provided) => ({
                            ...provided,
                            color: '#888',
                        }),
                    }}
                    value={topics.map(topic => ({ value: topic, label: topic }))}
                    onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map(option => option.value);
                        setTopics(selectedValues);
                    }}
                    inputValue={newSkill}
                    onInputChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
 
 
                <div className='mb-3'>
                    <label htmlFor="">Toc File:</label><br />
                    <input
                        style={{ width: '80%' }}
                        type="file"
                        onChange={(e) => { setTocFile(e.target.files[0]) }}
                    />
                </div >
 
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='mb-3'>
                        <label htmlFor="">Type Of Training :</label><br />
                        <select name="" id="" value={typeOfTraining} onChange={(e) => setTrainingType(e.target.value)}>
                            <option value="Corporate Training">Corporate Training</option>
                            <option value="College Training">College Training</option>
                            <option value="Individual">Individual</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="">Duration-Type :</label><br />
 
                        <select name="" id="" value={durationType} onChange={(e) => setDurationType(e.target.value)}>
                            <option value="Hours">Hours</option>
                            <option value="Days">Days</option>
                            <option value="Months">Months</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='mb-3'>
                        <label htmlFor="">Duration :</label><br />
                        <input type="text" value={durationCount}
                            onChange={(e) => setDurationCount(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="">Budget-Type :</label><br />
                        <select
                            value={selectedCountry}
                            onChange={(e) => {
                                setSelectedCountry(e.target.value);
                                setMinBudget('');
                                setMaxBudget('');
                            }} >
                            <option value="IND">IND</option>
                            <option value="USA">USA</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='mb-3'>
                        <label htmlFor="">Min Budget :</label><br />
                        <input
                            className='postEditBudget'
                            type="text"
                            value={minBudget}
                            onChange={(e) => setMinBudget(e.target.value)}
                            placeholder={placeholders[selectedCountry]}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="">Max Budget :</label><br />
                        <input
                            className='postEditBudget'
                            type="text"
                            value={maxBudget}
                            onChange={(e) => setMaxBudget(e.target.value)}
                            placeholder={placeholders[selectedCountry]}
                        />
                    </div>
                </div>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='mb-3'>
                        <label htmlFor="">Start Date :</label><br />
                        <input type="date" value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
 
                    <div className='mb-3'>
                        <label htmlFor="">End Date :</label><br />
                        <input type="date" value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='mb-3'>
                        <label htmlFor="">Mode Of Training :</label><br />
                        <select name="" id="" value={modeOfTraining} onChange={(e) => setTrainingMode(e.target.value)}>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
 
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="">Location :</label><br />
                        <select
                            name=""
                            id=""
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            disabled={modeOfTraining === "Online"}
                        >
                            <option value="">
                                Select Location
                            </option>
                            {states.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <br />
                <div className='flex justify-evenly items-center'>
                    <button
                        style={{
                            padding: "3px 50px",
                            borderRadius: "10px",
                            color: "#2676C2",
                            border: '1px solid #2676C2'
                        }}
                        onClick={() => props.setTrigger(false)}
                    >
                        Cancel
                    </button>
                    <button
                        style={{
                            padding: "3px 50px",
                            backgroundColor: "#2676C2",
                            borderRadius: "10px",
                            color: "white",
                        }}
                        onClick={() => handleUpdate(postEditDetails._id)}
                    >
                        Update
                    </button>
                </div>
            </div>
 
        </div >
    ) : null
}
 
export default EmployerPostEdit;