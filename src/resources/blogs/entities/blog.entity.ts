import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from "typeorm";

@Entity({ name: 'blogs' })
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    image: string;

    @Column()
    content: string;

    @Column()
    writer: string

    @Column()
    category: string;

    @Column()
    tags: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
