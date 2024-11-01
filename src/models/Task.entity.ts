import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { User } from './User.entity';

export enum TaskStatus {
	CANCELLED = 'Cancelada',
	PENDING = 'Pendiente',
	IN_PROGRESS = 'En progreso',
	DONE = 'Hecha',
}

@Entity('Tasks')
export class Task extends BaseEntity {
	@Column({ type: 'varchar', length: 255 })
	title: string;

	@Column({ type: 'text' })
	description: string;

	@Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
	status: TaskStatus;

	@ManyToOne(() => User, (user) => user.tasks)
	user: User;

	@Column({ type: 'date', nullable: true })
	limitDate: Date;
}
