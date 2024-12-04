import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    url: string;
}