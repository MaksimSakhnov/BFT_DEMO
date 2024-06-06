import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './create-task.dto';
import { TaskDto } from './task.dto';
import { UpdateTaskStatusDto } from '@modules/task/update-status.dto';
export declare class TasksService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<TaskEntity>);
    createTask(createTaskDto: CreateTaskDto): Promise<TaskDto>;
    getTasks(): Promise<TaskDto[]>;
    updateTaskStatus(id: number, updateTaskStatusDto: UpdateTaskStatusDto): Promise<TaskDto>;
}
