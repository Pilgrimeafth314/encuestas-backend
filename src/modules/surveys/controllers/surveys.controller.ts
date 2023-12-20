import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { SurveysService } from '../services/surveys.service';
import { CreateSurveyDto } from 'src/dto/create-survey.dto';
import { UpdateSurveyDto } from 'src/dto/update-survey.dto';
import { QuestionsService } from '../services/questions.service';
import { GeneralAuthGuard } from '../guards/auth.guard';
import { CreatorAccess } from '../decorators/creator.decorator';

@Controller('surveys')
//Decoradores desactivados para poder hacer pruebas en development
@UseGuards(GeneralAuthGuard)
export class SurveysController {
  constructor(
    private surveysService: SurveysService,
    private questionsService: QuestionsService,
  ) {}

  @Get()
  @CreatorAccess()
  async findAll() {
    return await this.surveysService.findAll();
  }

  @Get(':id')
  @CreatorAccess()
  async findOne(@Param('id') id: string) {
    const survey = await this.surveysService.findOne(id);
    if (!survey) throw new NotFoundException('Encuesta no encontrada');
    return survey;
  }

  @Post()
  @CreatorAccess()
  async create(@Body() body: CreateSurveyDto) {
    try {
      await this.surveysService.create(body);

      const response = {
        message: 'Success',
        error: false,
        statusCode: 200,
      };

      return response;
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException('La encuesta ya existe');
    }
  }

  @Delete(':id')
  @CreatorAccess()
  async delete(@Param('id') id: string) {
    const survey = await this.surveysService.delete(id);
    if (!survey) throw new NotFoundException('Encuesta no encontrada');

    survey.value.answers.forEach(answerId => {
      this.questionsService.delete(answerId._id.toString());
    });
    return await this.surveysService.findAll();
  }

  @Put(':id')
  @CreatorAccess()
  async update(@Param('id') id: string, @Body() body: UpdateSurveyDto) {
    const survey = await this.findOne(id);

    if (!survey) throw new NotFoundException('Encuesta no encontrada');

    if (survey.__v > 0) {
      //Evita que se alteren las preguntas en caso de que sean enviadas y la encuesta tenga respuestas
      body.questions = survey.questions;
    }

    if (body.questions.length === 0) {
      throw new BadRequestException('Debes colocar almenos unas pregunta.');
    }

    const surveyUpdated = await this.surveysService.update(id, body);
    return surveyUpdated;
  }
}
