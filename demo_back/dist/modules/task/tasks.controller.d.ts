import { TaskDto } from '@modules/task/task.dto';
import { CreateTaskDto } from '@modules/task/create-task.dto';
import { TasksService } from '@modules/task/task.service';
import { UpdateTaskStatusDto } from '@modules/task/update-status.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    createTask(createTaskDto: CreateTaskDto): Promise<TaskDto>;
    getTasks(): Promise<TaskDto[]>;
    updateTaskStatus(id: number, updateTaskStatusDto: UpdateTaskStatusDto): Promise<TaskDto>;
}
