import { InjectModel } from '@m8a/nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateSurveyDto } from 'src/dto/create-survey.dto';
import { UpdateSurveyDto } from 'src/dto/update-survey.dto';
import { Survey } from 'src/models/survey.model';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey) private surveyModel: ReturnModelType<typeof Survey>,
  ) {}

  async findAll() {
    return await this.surveyModel.find().exec();
  }

  async create(survey: CreateSurveyDto) {
    const newSurvey = new this.surveyModel(survey);
    return await newSurvey.save();
  }

  async findOne(id: string) {
    return await this.surveyModel.findById(id);
  }

  async findBySlug(slug: string) {
    return await this.surveyModel.findOne({ slug }).exec();
  }

  async delete(id: string) {
    return await this.surveyModel.findByIdAndDelete(id);
  }

  async update(id: string, survey: UpdateSurveyDto) {
    return await this.surveyModel.findByIdAndUpdate(id, survey, { new: true });
  }
}
