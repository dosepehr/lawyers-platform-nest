import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseType } from 'src/types/response.interface';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogsRepository: Repository<Blog>
  ) { }
  async create(createBlogDto: CreateBlogDto): Promise<ResponseType<Blog>> {
    const blog = this.blogsRepository.create(createBlogDto);
    await this.blogsRepository.save(blog);
    return {
      status: 201,
      message: 'Blog created successfully',
    }
  }

  async findAll(): Promise<ResponseType<Blog[]>> {
    const blogs = await this.blogsRepository.find();
    return {
      status: 200,
      message: 'Blogs fetched successfully',
      data: blogs
    }
  }

  async findOne(id: number): Promise<ResponseType<Blog>> {
    const blog = await this.blogsRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return {
      status: 200,
      message: 'Blog fetched successfully',
      data: blog
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<ResponseType<Blog>> {
    await this.findOne(id);
    await this.blogsRepository.update(id, updateBlogDto);
    return {
      status: 200,
      message: 'Blog updated successfully',
    }
  }

  async softDelete(id: number): Promise<ResponseType<Blog>> {
    await this.findOne(id);
    await this.blogsRepository.softDelete(id);
    return {
      status: 200,
      message: 'Blog soft deleted successfully',
    }
  }

  async hardDelete(id: number): Promise<ResponseType<Blog>> {
    await this.findOne(id);
    await this.blogsRepository.delete(id);
    return {
      status: 200,
      message: 'Blog hard deleted successfully',
    }
  }

  async restore(id: number): Promise<ResponseType<Blog>> {
    const blog = await this.blogsRepository.findOne({ where: { id }, withDeleted: true });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    if (!blog.deletedAt) {
      throw new BadRequestException('Blog is not deleted');
    }
    await this.blogsRepository.restore(id);
    return {
      status: 200,
      message: 'Blog restored successfully',
    }
  }
}