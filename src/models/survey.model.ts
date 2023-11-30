import { Prop, ModelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { Question } from './question.model';
import slugify from 'slugify';
import { UserAnswers } from './answer.model';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Survey {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    unique: true,
    default: function (this: DocumentType<Survey>) {
      return slugify(this.title, { lower: true });
    },
  })
  slug: string;

  @Prop({
    default: true,
  })
  status: boolean;

  @Prop({ type: () => [Question] })
  questions: Question[];


  @Prop({
    type: Date,
    default: () => new Date(),
  })
  startDate: Date;

  @Prop({
    type: Date,
    default: null,
  })
  endDate: Date;

  @Prop({ ref: () => UserAnswers })
  answers: Ref<UserAnswers>[];
}
