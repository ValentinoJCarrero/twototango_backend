import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "src/models/Task.entity";

export class EditTaskDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}