import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'services' })
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    video: string;

    @Column()
    tags: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
