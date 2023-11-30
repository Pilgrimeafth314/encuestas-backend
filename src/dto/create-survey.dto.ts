import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { QuestionDto } from './questions-survey.dto';
import { Question } from 'src/models/question.model';

export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: Question[];

  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate?: Date;

  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  endDate?: Date;
}
