import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class VideoActivity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    action: string; // 'upload' or 'delete'

    @Column()
    videoName: string;

    @CreateDateColumn()
    timestamp: Date;
} 