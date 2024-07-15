import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employerSkillsUpdate, getSkillsData } from "../../../redux/action/employers.action";
import { toast } from "react-toastify";
import vector from "../../assets/Vector.svg";
import { useNavigate } from "react-router-dom";

const EmployerSkillsInfo = () => {

    const employer = useSelector(({ employerSignUp }) => {
        return employerSignUp?.employerDetails?.employerDetails;
    });

    const message = useSelector(({ employerSignUp }) => employerSignUp?.employerDetails?.message);
    // console.log(message);

    // useEffect(() => {
    //     if (message) {
    //         toast.success(message);
    //     }
    //     console.log(employer);
    // }, [message]);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const skillRef = useRef();

    const skillDataVal = useSelector(({ employerSignUp }) => {
        return employerSignUp?.skillData
    });
    useEffect(() => {
        dispatch(getSkillsData());
    }, [dispatch]);

    useEffect(() => {
        if (skillDataVal?.success) {
            setFilteredItems(skillDataVal?.skills);
        }
    }, [skillDataVal]);

    const [filteredItems, setFilteredItems] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    // Moved filtering logic inside a useEffect to update state with filtered items
    useEffect(() => {
        if (searchQuery !== "") {
            const filtered = skillDataVal?.skills?.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredItems(filtered);
        } else {
            setFilteredItems(skillDataVal?.skills || []);
        }
    }, [searchQuery, skillDataVal]);

    console.log('filteredItems', filteredItems);

    const [clickedTitles, setClickedTitles] = useState(employer?.skills?.map(({ name, image }) => { return { name, image } }) || []);

    useLayoutEffect(() => {
        if (employer?.skills) {
            setClickedTitles(employer?.skills);
        }
    }, [employer?.skills]);

    const handleItemClick = (itemName, itemImage) => {
        const newItem = { name: itemName, image: itemImage };
        const alreadyClicked = clickedTitles.some((item) => item.name === itemName);

        if (!alreadyClicked) {
            setClickedTitles((prevTitles) => [...prevTitles, newItem]);
        } else if (
            searchQuery &&
            !filteredItems.some((item) => item.name.toLowerCase() === searchQuery.toLowerCase())
        ) {
            setClickedTitles((prevTitles) => [
                ...prevTitles,
                { name: searchQuery, image: null },
            ]);
        }
        setSearchQuery("");
    };

    const handleEnterKeyPressed = () => {
        if (
            searchQuery.trim() !== "" &&
            !filteredItems.some(
                (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
            )
        ) {
            setClickedTitles((prevTitles) => [
                ...prevTitles,
                { name: searchQuery, image: null },
            ]);
            setSearchQuery("");
        }
    };

    const handleItemClose = (index) => {
        const newTitles = [...clickedTitles];
        newTitles.splice(index, 1);
        setClickedTitles(newTitles);
    };

    const handleItemChange = (index, value) => {
        const updatedTitles = [...clickedTitles];
        updatedTitles[index] = value;
        setClickedTitles(updatedTitles);
    };

    const [originalSkills, setOriginalSkills] = useState([]);

    useLayoutEffect(() => {
        if (employer?.skills) {
            setClickedTitles(employer?.skills);
            setOriginalSkills(employer?.skills.map(skill => ({ name: skill.name, image: skill.image })));
        }
    }, [employer?.skills]);

    const normalizeSkills = (skills) => skills.map(({ name, image }) => ({ name, image }));

    const handleCase1Data = () => {

        const isChanged = JSON.stringify(normalizeSkills(clickedTitles)) !== JSON.stringify(normalizeSkills(originalSkills));
        if (!isChanged) {
            navigate('/employerprofile/profileupdate/experience');
            return;
        }

        dispatch(employerSkillsUpdate(clickedTitles));
        toast.success('Skills Info Updated');
        navigate('/employerprofile/profileupdate/experience');
    };
    return (
        <>
            <div className="updatedatas2">
                <div className="flex justify-between items-start">
                    <h6
                        style={{
                            color: "#535353",
                            fontWeight: "400",
                            fontSize: "18px",
                        }}
                    >
                        Skills
                    </h6>

                    <button
                        style={{
                            padding: "8px 70px",
                            backgroundColor: "#2676C2",
                            borderRadius: "10px",
                            color: "white",
                            marginRight: "70px",
                            marginBottom: "20px",
                        }}
                        onClick={handleCase1Data}
                    >
                        Update
                    </button>
                </div>
                <div className="flex ">
                    <div className="skillScroll border-r-2">
                        {clickedTitles.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between mt-2 pt-1 pb-1 ps-2 pe-2 "
                                style={{
                                    width: "180px",
                                    backgroundColor: "rgba(38, 118, 194, 0.2)",
                                    color: "#2676C2",
                                    borderRadius: "20px",
                                    cursor: "pointer",
                                }}
                            >
                                <h6 className="whitespace-normal break-words overflow-hidden text-ellipsis" style={{ marginRight: "10%" }}>{item.name}</h6>
                                <input
                                    ref={skillRef}
                                    value={item.name}
                                    type="text"
                                    placeholder="Type your skills"
                                    onChange={(e) => handleItemChange(index, e.target.value)}
                                    style={{ display: "none" }}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13"
                                    height="13"
                                    viewBox="0 0 13 13"
                                    fill="none"
                                    className="ms-3"
                                    onClick={() => handleItemClose(index)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <path
                                        d="M1.36373 1.94975L6.31348 6.89949M6.31348 6.89949L11.2632 11.8492M6.31348 6.89949L1.36373 11.8492M6.31348 6.89949L11.2632 1.94975"
                                        stroke="#2676C2"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>
                    <div className="m-5 mt-0" style={{ width: '550px' }}>
                        <div
                            className="flex items-center"
                            style={{
                                border: "2px solid #D1D1D1",
                                borderRadius: "5px",
                                width: "500px",
                            }}
                        >
                            <input
                                style={{
                                    width: "500px",
                                    height: "40px",
                                    color: "#888888",
                                    borderLeft: "none",
                                    cursor: "pointer",
                                    border: "0",
                                    fontSize: "14px",
                                }}
                                className="ps-3 outline-none mt-0"
                                type="text"
                                placeholder="Type your skills"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleEnterKeyPressed();
                                    }
                                }}
                                maxLength="32"
                            />
                            <svg
                                className=""
                                style={{ marginRight: "20px" }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="45"
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
                        </div>
                        {filteredItems.length > 0 && (
                            <h6
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "400",
                                    color: "#535353",
                                    marginTop: "20px",
                                    marginBottom: "12px",
                                }}
                            >
                                Most Demanded Skills
                            </h6>
                        )}
                        <div className="skillData flex flex-wrap cursor-pointer justify-evenly">
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, index) => (
                                    <div
                                        className="mt-5 me-6"
                                        style={{ width: "130px" }}
                                        key={index}
                                        onClick={() => handleItemClick(item.name, item.image)}                      >
                                        <img
                                            style={{
                                                height: "147px",
                                                padding: "20px",
                                                borderRadius: "8px",
                                                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                            }}
                                            src={item.image}
                                            alt=""
                                        />
                                        <h6
                                            style={{
                                                fontSize: "14px",
                                                color: "#535353",
                                                marginTop: "10px",
                                                fontWeight: "400",
                                                display: "flex",
                                            }}
                                        >
                                            {item.name}{" "}
                                            <img
                                                style={{ marginLeft: "10px" }}
                                                src={vector}
                                                alt=""
                                            />
                                        </h6>
                                    </div>
                                ))
                            ) : (
                                <div style={{ marginTop: "100px" }}>No data found</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmployerSkillsInfo;