import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
