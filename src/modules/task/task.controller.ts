import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { GetUser } from 'src/infrastructure/decorators/get-user.decorator';
import { User } from 'src/models/User.entity';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getTasksByUser(@GetUser() user: User) {
		const tasks = await this.taskService.getTasksByUserId(user.id);

		return { ok: true, tasks };
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getTaskById(@Param('id') id: string) {
		const task = await this.taskService.getTaskById(id);

		return { ok: true, task };
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	async createTask(@GetUser() user: User, @Body() task: CreateTaskDto) {
		const createdTask = await this.taskService.createTask(user, task);

		return { ok: true, createdTask };
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')
	async editTask(@Param('id') id: string, @Body() task: EditTaskDto) {
		const editedTask = await this.taskService.editTask(id, task);

		return { ok: true, editedTask };
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteTask(@Param('id') id: string) {
		await this.taskService.deleteTask(id);

		return { ok: true };
	}
}
