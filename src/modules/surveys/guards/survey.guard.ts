import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SurveysService } from '../services/surveys.service';
import { Request } from 'express';
import { QuestionsService } from '../services/questions.service';
import { useSurvey } from 'src/util/use.survey';

@Injectable()
export class SurveyGuard implements CanActivate {
  constructor(
    private readonly surveyService: SurveysService,
    private questionsService: QuestionsService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const survey = await this.surveyService.findBySlug(req.params.slug);
    if (!survey || !survey.status)
      throw new NotFoundException(
        'Encuesta no encontrada o no está disponible',
      );

    const surveyManage = useSurvey(survey);
    if (surveyManage.exp !== null && surveyManage.is_expired)
      throw new BadRequestException('La encuesta ha finalizado');

    if (!surveyManage.is_expired && +surveyManage.int.getTime() >= +surveyManage.currentDate.getTime()) {
      const date = surveyManage.int;
      throw new BadRequestException(`La encuesta inicia ${`${date.getDate() + 1 }/${date.getMonth() + 1}/${date.getFullYear()}`}`);
    }

    const { email } = req;
    const questions = await this.questionsService.findAllByIdSurvey(survey.id);
    const userAlreadyAnswer = questions.find(
      answers => answers.email === email,
    );
    if (userAlreadyAnswer)
      throw new BadRequestException('Ya has contestado esta encuesta');

    return true;
  }
}
