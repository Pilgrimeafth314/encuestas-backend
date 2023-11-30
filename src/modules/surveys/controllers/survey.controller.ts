import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { SurveysService } from '../services/surveys.service';
import { AnswerSurveyDto } from 'src/dto/answer-survey.dto';
import { GeneralAuthGuard } from '../guards/auth.guard';
import { QuestionsService } from '../services/questions.service';
import { SurveyGuard } from '../guards/survey.guard';

@Controller('encuesta')
@UseGuards(GeneralAuthGuard, SurveyGuard)
export class SurveyController {
  constructor(
    private surveysService: SurveysService,
    private questionsService: QuestionsService,
  ) {}

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const survey = await this.surveysService.findBySlug(slug);
    return survey;
  }

  @Put(':slug')
  async answer(
    @Param('slug') slug: string,
    @Body() answer: AnswerSurveyDto,
    @Request() req: Request,
  ) {
    const survey = await this.surveysService.findBySlug(slug);
    answer.email = req['email'];
    answer.name = req['name'];

    const matchingQuestions = answer.answers.filter(question => {
      const questionId = question.id_question;
      const matchingQuestion = survey?.questions.find(
        (otherQuestion: { id: string }) => otherQuestion.id === questionId,
      );
      return matchingQuestion !== undefined;
    });

    const validResponses: boolean[] = matchingQuestions.map(question => {
      const response = question.response;
      const matchingQuestion = survey?.questions.find(
        (otherQuestion: { id: string }) =>
          otherQuestion.id === question.id_question,
      );
      const matchingResponse = matchingQuestion?.options.find(
        (option: { id: string }) => option.id === response[0],
      );

      return (
        matchingResponse !== undefined ||
        (matchingQuestion?.required === false && response.length === 0)
      );
    });

    if (
      validResponses.length !== survey.questions.length ||
      validResponses.includes(false)
    ) {
      throw new BadRequestException(
        'La encuesta fue alterada, por favor recarga la página.',
      );
    }

    const answers = await this.questionsService.create(answer);
    answers.owner = survey;
    survey.answers.push(answers);
    await answers.save();
    await survey.save();

    return {
      message: true,
      error: 'Success',
      statusCode: 200,
    };
  }
}
