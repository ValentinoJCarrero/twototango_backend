import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/models/Task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/models/User.entity';

@Injectable()
export class TaskService {
	constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

	async getTasksByUserId(userId: string) {
		const tasks = await this.taskRepository.find({ where: { user: { id: userId } }, relations: ['user'] });

		return tasks;
	}

	async getTaskById(id: string) {
		const task = await this.taskRepository.findOneBy({ id });
		if (!task) throw new NotFoundException('Tarea inexistente');

		return task;
	}

	async createTask(user: User, task: CreateTaskDto) {
		const createdTask = await this.taskRepository.save({ ...task, user });

		return createdTask;
	}

	// any para no tener problemas con propiedad que no están en el dto
	async editTask(id: string, task: any) {
		let foundTask = await this.getTaskById(id);

		return await this.taskRepository.save({ ...foundTask, ...task });
	}

	async deleteTask(id: string) {
		const deletedTask = await this.taskRepository.delete(id);
		if (deletedTask.affected < 1) throw new BadRequestException('Tarea inexistente');

		return deletedTask;
	}
}
