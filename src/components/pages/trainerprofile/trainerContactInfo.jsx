import { useDispatch, useSelector } from "react-redux";
import { trainerContactInfoUpdate, trainerDetails } from "../../../redux/action/trainer.action";
import { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TrainerConatctInfo = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(trainerDetails());
    }, [dispatch]);

    const trainer = useSelector(({ trainerSignUp }) => {
        return trainerSignUp?.trainerDetails?.trainerDetails;
    });

    const message = useSelector(({ trainerSignUp }) => trainerSignUp?.trainerDetails?.message);
    console.log(message);

    // useEffect(() => {
    //     if (message) {
    //         toast.success(message);
    //     }
    // }, [message]);

    const [primaryNumber, setPrimaryNumber] = useState(trainer?.contactInfo?.primaryNumber || "");
    const [secondaryNumber, setSecondaryNumber] = useState(trainer?.contactInfo?.secondaryNumber || "");
    const [address, setAddress] = useState(trainer?.contactInfo?.address || "");
    const [email, setEmail] = useState(trainer?.contactInfo?.email || "");
    const [website, setWebsite] = useState(trainer?.contactInfo?.website || "");
    const [availableDate, setAvailableDate] = useState(trainer?.contactInfo?.availableDate || "");


    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (e.target.name === "primaryNumber") {
                document.querySelector("[name=secondaryNumber]").focus();
            } else if (e.target.name === "secondaryNumber") {
                document.querySelector("[name=address]").focus();
            } else if (e.target.name === "address") {
                document.querySelector("[name=email]").focus();
            } else if (e.target.name === "email") {
                document.querySelector("[name=website]").focus();
            }
        }
    };


    useLayoutEffect(() => {
        if (trainer) {

            setPrimaryNumber(trainer?.contactInfo?.primaryNumber);
            setSecondaryNumber(trainer?.contactInfo?.secondaryNumber);
            setAddress(trainer?.contactInfo?.address);
            setEmail(trainer?.contactInfo?.email);
            setWebsite(trainer?.contactInfo?.website);
            setAvailableDate(trainer?.contactInfo?.availableDate)
        }
    }, [trainer]);

    const handleCase3Data = (e) => {
        e.preventDefault();

        const contactInfo = {
            primaryNumber: primaryNumber,
            secondaryNumber: secondaryNumber || null,
            address: address,
            email: email,
            website: website,
            availableDate: availableDate,
            status: true,
        };

        dispatch(trainerContactInfoUpdate(contactInfo));
        toast.success('Contact Info Update Successfully');
        navigate('/trainerprofile/profileupdate/experience')
    };

    const handlePrimaryNumberChange = (e) => {
        const { value } = e.target;
        const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        setPrimaryNumber(numericValue);
    };

    const handleSecondaryNumberChange = (e) => {
        const { value } = e.target;
        const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        setSecondaryNumber(numericValue);
    };

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
        const dd = String(today.getDate()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}`;
    };

    const todayDate = getTodayDate();

    return (
        <>
            <div className="contactInfo">
                <h6
                    style={{
                        color: "#535353",
                        fontWeight: "400",
                        fontSize: "18px",
                        marginTop: "14px",
                        marginBottom: "30px",
                    }}
                >
                    Contact Information
                </h6>

                <form onSubmit={handleCase3Data}>
                    <div className="flex">
                        <div style={{ marginRight: "50px" }}>
                            <label htmlFor="">Primary Contact *</label>
                            <br />
                            <input
                                type="tel"
                                maxLength="10"
                                minLength="10"
                                value={primaryNumber}
                                onChange={handlePrimaryNumberChange}
                                name="primaryNumber"
                                onKeyDown={handleKeyDown}
                                required
                                placeholder="Type your mobile number"
                                disabled
                                autoComplete="off"

                            />
                        </div>
                        <div>
                            <label htmlFor="">Secondary Contact</label>
                            <br />
                            <input
                                type="tel"
                                maxLength="10"
                                minLength="10"
                                value={secondaryNumber}
                                onChange={handleSecondaryNumberChange}
                                name="secondaryNumber"
                                onKeyDown={handleKeyDown}
                                placeholder="Type your mobile number"
                                autoComplete="off"

                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="">Address *</label>
                        <br />
                        <input
                            style={{ width: "690px" }}
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            name="address"
                            onKeyDown={handleKeyDown}
                            required
                            placeholder="Type your address"
                            maxLength="180"
                            autoComplete="off"

                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="">Email *</label>
                        <br />
                        <input
                            style={{ width: "690px" }}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            onKeyDown={handleKeyDown}
                            required
                            placeholder="Type your mail address"
                            autoComplete="off"

                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="">Website </label>
                        <br />
                        <input
                            style={{ width: "690px" }}
                            type="url"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            name="website"
                            onKeyDown={handleKeyDown}
                            placeholder="Type website link here"
                            autoComplete="off"

                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="">Availabel On </label>
                        <br />
                        <input
                            style={{ width: "250px", cursor: "pointer" }}
                            type="date"
                            value={availableDate}
                            onChange={(e) => setAvailableDate(e.target.value)}
                            name="availableDate"
                            min={todayDate}
                        />
                    </div>
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
                        Update
                    </button>
                </form>
            </div>
        </>
    );
}

export default TrainerConatctInfo;