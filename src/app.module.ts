import { Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { SurveysModule } from './modules/surveys/surveys.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TypegooseModule.forRoot(process.env.MONGO_URI), SurveysModule, AuthModule],
})
export class AppModule {}
