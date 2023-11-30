import { Module } from '@nestjs/common';
import { SurveysController } from './controllers/surveys.controller';
import { SurveyController } from './controllers/survey.controller';
import { SurveysService } from './services/surveys.service';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { Survey } from 'src/models/survey.model';
import { QuestionsService } from './services/questions.service';
import { UserAnswers } from 'src/models/answer.model';
import { SurveyGraphicsController } from './controllers/survey-info.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([Survey]),
    TypegooseModule.forFeature([UserAnswers]),
  ],
  controllers: [SurveysController, SurveyController, SurveyGraphicsController],
  providers: [SurveysService, QuestionsService],
})
export class SurveysModule {}
