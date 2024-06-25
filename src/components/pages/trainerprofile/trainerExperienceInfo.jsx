import { useDispatch, useSelector } from "react-redux";
import { trainerDetails, trainerExperienceInfoUpdate } from "../../../redux/action/trainer.action";
import { toast } from "react-toastify";
import { useEffect, useLayoutEffect, useState } from "react";

const TrainerExperienceInfo = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(trainerDetails());
    }, [dispatch]);

    const trainer = useSelector(({ trainerSignUp }) => {
        return trainerSignUp?.trainerDetails?.trainerDetails;
    });

    const message = useSelector(({ trainerSignUp }) => trainerSignUp?.trainerDetails?.message);
    console.log(message);

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
    }, [message]);

    const [expertIn, setExpertIn] = useState(trainer?.experiences?.expertIn || "");
    const [experience, setExperience] = useState(trainer?.experiences?.experience || "");
    const [sinceInTheFiled, setSinceInTheFiled] = useState(trainer?.experiences?.sinceInTheFiled || "");
    const [recentCompany, setRecentCompany] = useState(trainer?.experiences?.recentCompany || "");
    const [trainingSession, setTrainingSession] = useState(trainer?.experiences?.trainingSession || '')

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (e.target.name === "expertIn") {
                document.querySelector("[name=experience]").focus();
            } else if (e.target.name === "experience") {
                document.querySelector("[name=sinceInTheFiled]").focus();
            } else if (e.target.name === "sinceInTheFiled") {
                document.querySelector("[name=recentCompany]").focus();
            } else if (e.target.name === "recentCompany") {
                document.querySelector("[name=trainingSession]").focus();
            }
        }
    };

    useLayoutEffect(() => {
        if (trainer) {

            setExpertIn(trainer?.experiences?.expertIn);
            setExperience(trainer?.experiences?.experience);
            setSinceInTheFiled(trainer?.experiences?.sinceInTheFiled);
            setRecentCompany(trainer?.experiences?.recentCompany);
            setTrainingSession(trainer?.experiences?.trainingSession)
        }
    }, [trainer]);

    const handleCase4Data = async () => {

        const experienceDetails = {
            expertIn: expertIn,
            experience: experience,
            sinceInTheFiled: sinceInTheFiled,
            recentCompany: recentCompany,
            trainingSession: trainingSession,
            status: true,
        };
        dispatch(trainerExperienceInfoUpdate(experienceDetails));

    };

    const handleSubmitData = async (e) => {
        e.preventDefault();
        await handleCase4Data();

    };

    return (
        <>
            <div className="contactInfo2">
                <h6
                    style={{
                        color: "#535353",
                        fontWeight: "400",
                        fontSize: "18px",
                        marginTop: "14px",
                        marginBottom: "30px",
                    }}
                >
                    Experience
                </h6>

                <form onSubmit={handleSubmitData}>
                    <span>
                        <label htmlFor="">Expert In *</label>
                        <br />
                        <input
                            style={{ width: "690px" }}
                            type="text"
                            value={expertIn}
                            onChange={(e) => setExpertIn(e.target.value)}
                            name="expertIn"
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your skill name"
                            required
                            maxLength="32"
                        />
                    </span>
                    <br />
                    <span>
                        <label htmlFor="">Experience *</label>
                        <br />
                        <input
                            style={{ width: "690px" }}
                            type="number"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            name="experience"
                            onKeyDown={handleKeyDown}
                            placeholder="Select your experience"
                            required
                            min="0"
                        />
                    </span>
                    <br />
                    <span>
                        <label htmlFor="">Since in this field *</label>
                        <br />
                        <input
                            style={{ width: "690px" }}
                            type="number"
                            value={sinceInTheFiled}
                            onChange={(e) => setSinceInTheFiled(e.target.value)}
                            name="sinceInTheFiled"
                            onKeyDown={handleKeyDown}
                            placeholder="yyyy"
                            required
                            min="0"
                        />
                    </span>
                    <br />
                    <span>
                        <label htmlFor="">Last Organization </label>
                        <br />
                        <input
                            style={{ width: "690px" }}
                            type="text"
                            value={recentCompany}
                            onChange={(e) => setRecentCompany(e.target.value)}
                            name="recentCompany"
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your Last Organization"
                            maxLength="42"
                        />
                    </span>
                    <span>
                        <label htmlFor="">Training Session + </label>
                        <br />
                        <input
                            style={{ width: "690px" }}
                            type="number"
                            value={trainingSession}
                            onChange={(e) => setTrainingSession(e.target.value)}
                            name="trainingSession"
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your Training Count"
                            min="0"
                        />
                    </span>
                    <button
                        type="submit"
                        style={{
                            padding: "8px 70px",
                            backgroundColor: "#2676C2",
                            borderRadius: "10px",
                            color: "white",
                            marginTop: "30px",
                            marginLeft: "490px",
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default TrainerExperienceInfo;