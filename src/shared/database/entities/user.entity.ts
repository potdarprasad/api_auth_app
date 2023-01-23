import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ name: 'first_name', type: 'varchar', nullable: true })
    public firstName: string | null;

    @Column({ name: 'last_name', type: 'varchar', nullable: true })
    public lastName: string | null;

    @Column({ type: 'varchar' })
    public email!: string;

    @Exclude()
    @Column({ type: 'varchar' })
    public password!: string;

    @Column({ name: 'last_login_at', type: 'timestamp', nullable: true, default: null })
    public lastLoginAt: Date | null;
}