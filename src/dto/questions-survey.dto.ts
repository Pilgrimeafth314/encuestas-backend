import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsEnum,
} from 'class-validator';
import { QuestionType } from 'src/models/question-type.enum';
import { OptionBase } from 'src/models/optionbase.model';
import { Type } from 'class-transformer';

export class OptionBaseDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class QuestionDto {
  @IsNotEmpty()
  @IsBoolean()
  required: boolean;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OptionBaseDto)
  options: OptionBase[];
}
