import { Survey } from 'src/models/survey.model';

export interface IUseSurvey {
  currentDate: Date;
  int: Date;
  exp: Date | null;
  is_expired: boolean;
}

export const useSurvey = (survey: Survey): IUseSurvey => {
  const currentDate = new Date();
  const initialDate = new Date(survey.startDate);
  const expiresDate = survey.endDate ? new Date(survey.endDate.toString().replace("Z", "-06:00")) : null;
  currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset())

  return {
    currentDate: currentDate,
    int: initialDate,
    exp: survey.endDate,
    is_expired: survey.endDate && +expiresDate.getTime() < +currentDate.getTime(),
  };
};
