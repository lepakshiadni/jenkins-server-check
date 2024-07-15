import { useEffect, useLayoutEffect, useState } from "react";
import { employerContactInfoUpdate, employerDetails } from "../../../redux/action/employers.action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmployerContactInfo = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const employer = useSelector(({ employerSignUp }) => {
        return employerSignUp?.employerDetails?.employerDetails;
    });
    console.log('employerContactDetails', employer?.contactInfo)
    const message = useSelector(({ employerSignUp }) => employerSignUp?.employerDetails?.message);
    // useEffect(() => {
    //     if (message) {
    //         toast.success(message);
    //     }
    //     console.log(employer);
    // }, [message]);
    useEffect(() => {
        dispatch(employerDetails());
    }, [dispatch]);

    const [primaryNumber, setPrimaryNumber] = useState(employer?.contactInfo?.primaryNumber || "");
    const [secondaryNumber, setSecondaryNumber] = useState(employer?.contactInfo?.secondaryNumber || "");
    const [address, setAddress] = useState(employer?.contactInfo?.address || "");
    const [email, setEmail] = useState(employer?.contactInfo?.email || "");
    const [website, setWebsite] = useState(employer?.contactInfo?.website || "");

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
        if (employer) {
            setPrimaryNumber(employer?.contactInfo?.primaryNumber);
            setSecondaryNumber(employer?.contactInfo?.secondaryNumber);
            setAddress(employer?.contactInfo?.address);
            setEmail(employer?.contactInfo?.email);
            setWebsite(employer?.contactInfo?.website);
        }
    }, [employer]);

    const handleCase3Data = async () => {
        const contactInfo = {
            primaryNumber: primaryNumber,
            secondaryNumber: secondaryNumber,
            address: address,
            email: email,
            website: website,
            status: true,
        };
        dispatch(employerContactInfoUpdate(contactInfo));
        toast.success('ContactInfo Updated')
        navigate('/employerprofile');
    };

    const handleSubmitData = async (e) => {
        e.preventDefault();

        const contactInfo = employer?.contactInfo;

        const hasChanged =
            primaryNumber !== contactInfo.primaryNumber ||
            secondaryNumber !== contactInfo.secondaryNumber ||
            address !== contactInfo.address ||
            email !== contactInfo.email ||
            website !== contactInfo.website;

        if (!hasChanged) {
            navigate('/employerprofile');
            return;
        }

        if (isValidEmail) {
            await handleCase3Data();
        } else {
            toast.error('Please enter a valid email address.');
        }
    };

    return (

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
            <form onSubmit={handleSubmitData}>
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
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EmployerContactInfo;