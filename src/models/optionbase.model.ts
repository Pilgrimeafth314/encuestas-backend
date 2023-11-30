import { Prop, ModelOptions } from '@typegoose/typegoose';
import { nanoid } from 'nanoid';

@ModelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class OptionBase {
  @Prop({
    default: () => nanoid(),
  })
  id: string;
  @Prop()
  title: string;
}
