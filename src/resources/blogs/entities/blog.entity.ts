import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Service } from "src/resources/services/entities/service.entity";

@Entity({ name: 'blogs' })
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @Column()
    image: string;

    @Column()
    content: string;

    @Column()
    writer: string

    @ManyToOne(() => Service, (service) => service.blogs)
    service: Service;

    @Column()
    tags: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
