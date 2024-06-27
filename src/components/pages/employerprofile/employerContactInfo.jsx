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
    // console.log(message);

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
        navigate('/employerprofile')

    };

    const handleSubmitData = async (e) => {
        e.preventDefault();
        await handleCase3Data();
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

                <form onSubmit={handleSubmitData}>
                    <div className="flex">
                        <div style={{ marginRight: "50px" }}>
                            <label htmlFor="">Primary Contact *</label>
                            <br />
                            <input
                                style={{ width: "320px" }}
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
                                style={{ width: "320px" }}
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

export default EmployerContactInfo;