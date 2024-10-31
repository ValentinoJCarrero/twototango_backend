import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './Base.entity';

@Entity({ name: 'Users' })
export class User extends BaseEntity {
	@Index({ unique: true })
	@Column({ type: 'varchar', length: 255, nullable: false })
	email: string;

    @Column({ type: 'varchar', length: 128, nullable: false, select: false })
    password: string;
}
