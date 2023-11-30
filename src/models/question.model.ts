import { Prop, ModelOptions, Ref} from '@typegoose/typegoose';
import { OptionBase } from './optionbase.model';
import { QuestionType } from './question-type.enum';
import { nanoid } from 'nanoid';
import { IsEmpty } from 'class-validator';
import { UserAnswers } from './answer.model';

@ModelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class Question {
  @Prop({
    required: false,
    default: () => nanoid(),
  })
  id: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  required: boolean;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    enum: QuestionType,
    required: true,
  })
  type: QuestionType;

  @Prop({
    type: () => [OptionBase],
    required: true,
  })
  options: OptionBase[];
}
