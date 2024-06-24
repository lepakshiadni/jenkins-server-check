import React from 'react'
import Upcoming from '../../mytrainings/TrainerMyTrainingchilds/Upcoming'
import { getAppliedTrainingEmployer } from '../../../../redux/action/employers.action'
import { useDispatch ,useSelector} from 'react-redux'
const TrainingProgramDasboard = () => {
  const dispatch = useDispatch()

  let ongoing;
  React.useEffect(() => {
    dispatch(getAppliedTrainingEmployer())
  }, [dispatch])

  const appliedTraining = useSelector(({ employerSignUp }) => {
    return employerSignUp?.getAppliedTrainingEmployer
  })


  if (appliedTraining?.success) {
    ongoing = appliedTraining?.getAppliedTraining?.slice(0,1)?.map((details) => {
      return {
        trainerDetails: {
          trainerId: details.trainerId,
          trainerProfileImg: details.trainerProfileImg,
          trainerName: details.trainerName,
          trainerDesignation: details.trainerDesignation,
          trainerRating: details.trainerRating
        },
        training: details?.trainingDetails?.filter(({ appliedStatus, trainingPostDetails }) => {
          if (appliedStatus) {
            // Check if training is ongoing
            return trainingPostDetails &&
              trainingPostDetails.startDate <= new Date().toISOString().substr(0, 10) &&
              trainingPostDetails.endDate >= new Date().toISOString().substr(0, 10);
          }
        })
      };
    });
  }

  return (
    <div>
      <Upcoming ongoing={ongoing} />
    </div>
  )
}

export default TrainingProgramDasboard