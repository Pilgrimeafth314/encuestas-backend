import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Answer } from 'src/models/answer.model';

class AnswerDto {
  @IsNotEmpty()
  @IsString()
  id_question: string;

  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  response: string[];
}

export class AnswerSurveyDto {
  name: string;
  email: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: Answer[];
}
