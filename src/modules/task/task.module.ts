import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/models/Task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/models/User.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
	imports: [TypeOrmModule.forFeature([Task, User])],
	providers: [TaskService, AuthService, JwtService],
	controllers: [TaskController],
})
export class TaskModule {}
