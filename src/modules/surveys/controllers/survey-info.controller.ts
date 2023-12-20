import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { SurveysService } from '../services/surveys.service';
import { CreatorAccess } from '../decorators/creator.decorator';
import { GeneralAuthGuard } from '../guards/auth.guard';

@Controller('info')
//Decoradores desactivados para poder hacer pruebas en development
@UseGuards(GeneralAuthGuard)
export class SurveyGraphicsController {
  constructor(private surveysService: SurveysService) {}

  @Get('/chartdata/:id')
  @CreatorAccess()
  async findOne(@Param('id') id: string) {
    const survey = await (
      await this.surveysService.findOne(id)
    ).populate('answers');
    if (!survey) throw new NotFoundException('Encuesta no encontrada');

    return await this.buildData(survey.questions, survey.answers);
  }

  @Get('/answers/:id')
  @CreatorAccess()
  async findAnswersPerSurvey(@Param('id') id: string) {
    const survey = await (
      await this.surveysService.findOne(id)
    ).populate('answers');
    if (!survey) throw new NotFoundException('Encuesta no encontrada');

    const transformarDatos = (array1, array2) => {
      const resultado = [];

      array1.forEach(item1 => {
        const transformadoItem = {
          name: item1.name,
          email: item1.email,
          answers: [],
        };

        array2.forEach(question => {
          const answer = item1.answers.find(a => a.id_question === question.id);
          const title = question.title;
          const responses = answer
            ? answer.response.map(res => {
                const option = question.options.find(opt => opt.id === res);
                return option ? option.title : 'no contestado';
              })
            : ['no contestado'];

          const newTitle = question.required ? '*' + title : title;
          transformadoItem.answers.push({
            title: newTitle,
            options: responses,
          });
        });

        resultado.push(transformadoItem);
      });

      return resultado;
    };

    return await transformarDatos(survey.answers, survey.questions);
  }

  async buildData(questions, documents) {
    const questionResponseCounts = {};

    questions.forEach(question => {
      const idQuestion = question.id;
      questionResponseCounts[idQuestion] = {};
      question.options.forEach(option => {
        questionResponseCounts[idQuestion][option.id] = 0;
      });
    });

    documents.forEach(document => {
      document.answers.forEach(answer => {
        const idQuestion = answer.id_question;

        if (!questionResponseCounts[idQuestion]) {
          questionResponseCounts[idQuestion] = {};
          questions
            .find(q => q.id === idQuestion)
            .options.forEach(option => {
              questionResponseCounts[idQuestion][option.id] = 0;
            });
        }

        answer.response.forEach(response => {
          questionResponseCounts[idQuestion][response]++;
        });
      });
    });

    const chartData = [];

    Object.entries(questionResponseCounts).forEach(
      ([questionId, responseCount]) => {
        const question = questions.find(q => q.id === questionId);
        const labels = question.options.map(option => option.title);
        const data = Object.values(responseCount);

        // Estructura los datos para cada pregunta
        const bgColors = [];
        const brColors = [];
        data.forEach(() => {
          const a = this.getRandomColor();
          bgColors.push(a.fill);
          brColors.push(a.border);
        });
        const questionData = {
          labels: labels,
          datasets: [
            {
              label: question.title,
              data: data,
              backgroundColor: bgColors,
              borderColor: brColors,
              borderWidth: 1,
            },
          ],
        };

        chartData.push(questionData);
      },
    );
    return chartData;
  }

  getRandomColor(): { fill: string; border: string } {
    const randomColor = () => Math.floor(Math.random() * 256);
    const red = randomColor();
    const green = randomColor();
    const blue = randomColor();
    return {
      fill: `rgba(${red}, ${green}, ${blue}, 0.3)`,
      border: `rgba(${red}, ${green}, ${blue}, 1)`,
    };
  }
}
