import { Module } from '@nestjs/common';

import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { TaskModule } from '@modules/task/task.module';

@Module({
  imports: [ConfigModule, TypeOrmModule, TaskModule],
})
export class AppModule {}
