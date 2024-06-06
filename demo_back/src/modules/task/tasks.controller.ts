import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskDto } from '@modules/task/task.dto';
import { CreateTaskDto } from '@modules/task/create-task.dto';
import { TasksService } from '@modules/task/task.service';
import { UpdateTaskStatusDto } from '@modules/task/update-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskDto> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Get()
  async getTasks(): Promise<TaskDto[]> {
    return await this.tasksService.getTasks();
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskDto> {
    return await this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }
}
