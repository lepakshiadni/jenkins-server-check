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

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPrimaryNumber, setIsValidPrimaryNumber] = useState(true);
    const [isValidSecondaryNumber, setIsValidSecondaryNumber] = useState(true);
    const [isValidWebsite, setIsValidWebsite] = useState(true);

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(email));
    };

    const handlePrimaryNumberChange = (e) => {
        const newPrimaryNumber = e.target.value.replace(/\D/g, '');
        setPrimaryNumber(newPrimaryNumber);
        validatePrimaryNumber(newPrimaryNumber);
    };

    const validatePrimaryNumber = (number) => {
        setIsValidPrimaryNumber(number.length === 10);
    };

    const handleSecondaryNumberChange = (e) => {
        const newSecondaryNumber = e.target.value.replace(/\D/g, '');
        setSecondaryNumber(newSecondaryNumber);
        validateSecondaryNumber(newSecondaryNumber);
    };

    const validateSecondaryNumber = (number) => {
        setIsValidSecondaryNumber(number.length === 0 || number.length === 10);
    };

    const handleWebsiteChange = (e) => {
        const newWebsite = e.target.value;
        setWebsite(newWebsite);
        validateWebsite(newWebsite);
    };

    const validateWebsite = (website) => {
        const websiteRegex = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/i;
        setIsValidWebsite(websiteRegex.test(website));
    };

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

        const updatedContactInfo = {
            primaryNumber,
            secondaryNumber: secondaryNumber || null,
            address,
            email,
            website,
            availableDate,
            status: true,
        };

        // Check if there are any changes
        const isContactInfoChanged =
            primaryNumber !== trainer.contactInfo.primaryNumber ||
            secondaryNumber !== trainer.contactInfo.secondaryNumber ||
            address !== trainer.contactInfo.address ||
            email !== trainer.contactInfo.email ||
            website !== trainer.contactInfo.website ||
            availableDate !== trainer.contactInfo.availableDate;

        if (isContactInfoChanged) {
            dispatch(trainerContactInfoUpdate(updatedContactInfo));
            toast.success('Contact Info Updated Successfully');
            navigate('/trainerprofile/profileupdate/experience');

        } else {
            navigate('/trainerprofile/profileupdate/experience');
        }

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
                                style={{ width: "320px", borderColor: isValidPrimaryNumber ? '#CECECE' : 'red' }}
                                type="tel"
                                maxLength="10"
                                minLength="10"
                                value={primaryNumber}
                                onChange={handlePrimaryNumberChange}
                                name="primaryNumber"
                                onKeyDown={handleKeyDown}
                                required
                                placeholder="Type your mobile number"
                                autoComplete="off"
                            />
                            {!isValidPrimaryNumber && (
                                <p className="text-sm text-[red]">Contact must be 10 digits long.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="">Secondary Contact</label>
                            <br />
                            <input
                                style={{ width: "320px", borderColor: isValidSecondaryNumber ? '#CECECE' : 'red' }}
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
                            {!isValidSecondaryNumber && (
                                <p className="text-sm text-[red]">Contact must be 10 digits long or left empty.</p>
                            )}
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
                            style={{ width: '690px', borderColor: isValidEmail ? '#CECECE' : 'red' }}
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            name="email"
                            onKeyDown={handleKeyDown}
                            required
                            placeholder="Type your email address"
                            autoComplete="off"
                        />
                        {!isValidEmail && (
                            <p className="text-sm text-[red]">Please enter a valid email address.</p>
                        )}
                    </div>
                    <div className="mt-2">
                        <label htmlFor="">Website </label>
                        <br />
                        <input
                            style={{ width: "690px", borderColor: isValidWebsite ? '#CECECE' : 'red' }}
                            type="url"
                            value={website}
                            onChange={handleWebsiteChange}
                            name="website"
                            onKeyDown={handleKeyDown}
                            placeholder="Type website link here"
                            autoComplete="off"
                        />
                        {!isValidWebsite && (
                            <p className="text-sm text-[red]">Please enter a valid website URL.</p>
                        )}
                    </div>
                    <div className="mt-2">
                        <label htmlFor="">Available On </label>
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
                            cursor: isValidEmail && isValidPrimaryNumber && isValidSecondaryNumber ? 'pointer' : 'not-allowed',
                            opacity: isValidEmail && isValidPrimaryNumber && isValidSecondaryNumber ? 1 : 0.5,
                        }}
                        disabled={!isValidEmail || !isValidPrimaryNumber || !isValidSecondaryNumber}
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    );
}

export default TrainerConatctInfo;