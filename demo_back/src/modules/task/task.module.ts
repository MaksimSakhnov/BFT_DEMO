import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '@modules/task/task.entity';
import { TasksService } from '@modules/task/task.service';
import { TasksController } from '@modules/task/tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TaskModule {}
