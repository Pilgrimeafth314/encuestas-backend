import { Prop, Ref, ModelOptions } from '@typegoose/typegoose';
import { Survey } from './survey.model';

@ModelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class Answer {
  @Prop({
    type: String,
    required: true,
  })
  id_question: string;

  @Prop({
    type: () => [String],
    required: true,
  })
  response: string[];
}

@ModelOptions({
  schemaOptions: {
    timestamps: false,
  },
})
export class UserAnswers {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  answerOn: Date;

  @Prop({
    type: () => [Answer],
    required: true,
  })
  answers: Answer[];

  @Prop({ ref: () => Survey })
  owner: Ref<Survey>;
}
