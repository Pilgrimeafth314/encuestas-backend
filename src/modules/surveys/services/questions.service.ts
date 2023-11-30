import { InjectModel } from '@m8a/nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnswerSurveyDto } from 'src/dto/answer-survey.dto';
import { UserAnswers } from 'src/models/answer.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(UserAnswers)
    private answerModel: ReturnModelType<typeof UserAnswers>,
  ) {}

  async findAllByIdSurvey(id_survey: string) {
    return await this.answerModel.find({ owner: id_survey }).exec();
  }

  async create(answers: AnswerSurveyDto) {
    const newanswers = new this.answerModel(answers);
    return await newanswers.save();
  }

  async delete(id: string) {
    return await this.answerModel.findByIdAndDelete(id);
  }

  async findOne(id: string) {
    return await this.answerModel.findById(id);
  }
}
