    import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import '../../styles/Requirements.css'
import '../../styles/TrainerMyTrainings.css'
import '../../styles/MyTrainings 1.css'
import Upcoming from './TrainerMyTrainingchilds/Upcoming';
import OngoingTraining from "./TrainerMyTrainingchilds/OnGoingTraining";
import Completed from './TrainerMyTrainingchilds/Completed';
import Denied from '../proposalMangement/TrainerProposalManagement/TrainerProposalDenied';
import { useDispatch, useSelector } from 'react-redux'
import { gettrainerAppliedTraining } from '../../../redux/action/trainer.action'


const TrainerMyTrainings = () => {
    const location = useLocation();
    const [activeSteps] = useState([1]);
    let upcomming;
    let completed;
    let ongoing;
    // let denied;
    const dispatch = useDispatch();

    useEffect(() => {
        setActiveOption(getActiveOption(location.pathname));
    }, [location.pathname]);
    
    const appliedTraining = useSelector(({ trainerSignUp }) => {
        return trainerSignUp?.gettrainerAppliedTraining?.trainingPostData;
    })

    useEffect(() => {
        dispatch(gettrainerAppliedTraining())
    }, [dispatch])

    // console.log('appliedTraining',appliedTraining)
    if (appliedTraining) {
        upcomming = appliedTraining?.filter(({ appliedStatus, trainingPostDetails }) => {
            if (appliedStatus) {
                // if (trainingPostDetails?.startDate >= new Date().toISOString().slice(0, 10 &&
                //     trainingPostDetails?.endDate >= new Date().toISOString().slice(0, 10))) {
                //     // console.log('data',new Date().toISOString().slice(0, 10))
                //     return trainingPostDetails
                // }
                return trainingPostDetails &&
                    trainingPostDetails.startDate >= new Date().toISOString().slice(0, 10) &&
                    trainingPostDetails.endDate >= new Date().toISOString().slice(0, 10);
            }
        })
        ongoing = appliedTraining?.filter(({ appliedStatus,enableTraining, trainingPostDetails }) => {
            if (appliedStatus &&enableTraining) {
                // if(trainingPostDetails?.startDate <  new Date().toISOString().slice(0, 10) &&
                // trainingPostDetails?.endDate >  new Date().toISOString().slice(0, 10)
                // ) {
                //     return trainingPostDetails
                // }
                return trainingPostDetails &&
                    trainingPostDetails.startDate <= new Date().toISOString().slice(0, 10) &&
                    trainingPostDetails.endDate >= new Date().toISOString().slice(0, 10);
            }
        })
        completed = appliedTraining?.filter(({ appliedStatus,enableTraining, trainingPostDetails }) => {
            if (appliedStatus && enableTraining) {
                if (trainingPostDetails?.endDate < new Date().toISOString().slice(0, 10) &&
                    trainingPostDetails?.startDate < new Date().toISOString().slice(0, 10)) {
                    return trainingPostDetails
                }
            }
        })
        // denied = appliedTraining?.filter(({ appliedStatus,applicationstatus }) => appliedStatus === false &&  applicationstatus ==='Denied')
    }
    // console.log('upcoming',upcomming)
    // console.log('completed',completed)
    // console.log('ongoing', ongoing)
    // console.log('denied',denied)

    const getActiveOption = (pathname) => {
        if (pathname.startsWith("/trainerDashboard/mytrainings/upcoming")) return "upComing";
        if (pathname.startsWith("/trainerDashboard/mytrainings/ongoing")) return "onGoingtraining";
        if (pathname.startsWith("/trainerDashboard/mytrainings/completed")) return "comPleted";
        // if (pathname.startsWith("/trainerDashboard/mytrainings/denied")) return "deNied";
        return "upComing"; // Default if none matches
    };

    const [activeOption, setActiveOption] = useState(getActiveOption(location.pathname));

    const calculateProgressBarWidth = () => {
        const totalSteps = 3; // Update this based on the total number of steps
        const width = (activeSteps.length - 1) / (totalSteps - 1) * 100;
        return `${width}%`;
    };

    const renderComponent = () => {
        switch (activeOption) {
            case "upComing":
                return <Upcoming activeSteps={activeSteps} upcomming={upcomming} calculateProgressBarWidth={calculateProgressBarWidth} />;
            case "onGoingtraining":
                return <OngoingTraining activeSteps={activeSteps} ongoing={ongoing} calculateProgressBarWidth={calculateProgressBarWidth} />;
            case "comPleted":
                return <Completed activeSteps={activeSteps} completed={completed} calculateProgressBarWidth={calculateProgressBarWidth} />;
            // case "deNied":
            //     return <Denied activeSteps={activeSteps} denied={denied} calculateProgressBarWidth={calculateProgressBarWidth} />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="Post_Buttons ">
                <Link to="/trainerDashboard/mytrainings/upcoming">
                    <button className={`mr-[19px] min-w-[163px] w-auto h-[31px]  ${activeOption === 'upComing' ? 'active' : ''}`}>
                        Upcoming
                    </button>
                </Link>
                <Link to="/trainerDashboard/mytrainings/ongoing">
                    <button className={`mr-[19px] min-w-[163px] w-auto h-[31px]  ${activeOption === 'onGoingtraining' ? 'active' : ''}`}>
                        On Going Training
                    </button>
                </Link>
                <Link to="/trainerDashboard/mytrainings/completed">
                    <button className={`mr-[19px] min-w-[163px] w-auto h-[31px]  ${activeOption === 'comPleted' ? 'active' : ''}`}>
                        Completed
                    </button>
                </Link>
                {/* <Link to="/trainerDashboard/mytrainings/denied">
                    <button className={`mr-[19px] min-w-[163px] w-auto h-[31px]  ${activeOption === 'deNied' ? 'active' : ''}`}>
                        Denied
                    </button>
                </Link> */}
            </div>
            {renderComponent()}
        </div>
    );
};

export default TrainerMyTrainings;
