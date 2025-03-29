import { Blog } from "src/resources/blogs/entities/blog.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'services' })
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column()
    content: string;

    @Column()
    image: string;

    @Column()
    video: string;

    @Column()
    tags: string;

    @OneToMany(() => Blog, (blog) => blog.service)
    blogs: Blog[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
