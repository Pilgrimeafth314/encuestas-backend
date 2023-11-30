import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { QuestionDto } from './questions-survey.dto';
import { Question } from 'src/models/question.model';

export class UpdateSurveyDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: Question[];

  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate?: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate?: Date;
}
