import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    confirmPassword: string;

    @Column({ nullable: true })
    resetOTP: string;

    @Column({ nullable: true })
    resetOTPExpiry: Date;
}