import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { Task } from './Task.entity';

@Entity({ name: 'Users' })
export class User extends BaseEntity {
	@Index({ unique: true })
	@Column({ type: 'varchar', length: 255, nullable: false })
	email: string;

	@Column({ type: 'varchar', length: 128, nullable: false, select: false })
	password: string;

	@OneToMany(() => Task, (task) => task.user)
	tasks: Task[];
}
