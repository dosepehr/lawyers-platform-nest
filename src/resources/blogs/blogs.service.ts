import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseType } from 'src/utils/types/response.interface';
import { deleteFile } from 'src/utils/funcs/deleteFile';
@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>
  ) { }

  async checkSlug(slug: string): Promise<ResponseType<Blog>> {
    const blog = await this.blogRepository.findOne({ where: { slug } });
    if (blog) {
      throw new BadRequestException('Slug is already in use');
    }
    return {
      statusCode: 200,
      message: 'Slug is unique',
    }
  }

  async create(createBlogDto: CreateBlogDto, file: Express.Multer.File): Promise<ResponseType<Blog>> {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    await this.checkSlug(createBlogDto.slug);

    const blog = this.blogRepository.create({
      ...createBlogDto,
      image: file.path
    });

    await this.blogRepository.save(blog);
    return {
      statusCode: 201,
      message: 'Blog created successfully',
      data: blog
    }
  }

  async findAll(): Promise<ResponseType<Blog[]>> {
    const blogs = await this.blogRepository.find();
    return {
      statusCode: 200,
      message: 'Blogs fetched successfully',
      data: blogs
    }
  }

  async findOne(slug: string): Promise<ResponseType<Blog>> {
    const blog = await this.blogRepository.findOne({ where: { slug } });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return {
      statusCode: 200,
      message: 'Blog fetched successfully',
      data: blog
    }
  }

  async findOneById(id: number): Promise<ResponseType<Blog>> {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return {
      statusCode: 200,
      message: 'Blog fetched successfully',
      data: blog
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto, file: Express.Multer.File): Promise<ResponseType<Blog>> {
    const blog = await this.findOneById(id);
    await this.checkSlug(updateBlogDto.slug as string);
    const updateData = { ...updateBlogDto };
    if (file) {
      // delete old file
      deleteFile(blog?.data?.image);
      updateData.image = file.path;
    }
    await this.blogRepository.update(id, updateData);
    return {
      statusCode: 200,
      message: 'Blog updated successfully',
    }
  }

  async softDelete(id: number): Promise<ResponseType<Blog>> {
    await this.findOneById(id);
    await this.blogRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'Blog soft deleted successfully',
    }
  }

  async hardDelete(id: number): Promise<ResponseType<Blog>> {
    const blog = await this.findOneById(id);
    deleteFile(blog?.data?.image);
    await this.blogRepository.delete(id);
    return {
      statusCode: 200,
      message: 'Blog hard deleted successfully',
    }
  }

  async restore(id: number): Promise<ResponseType<Blog>> {
    const blog = await this.blogRepository.findOne({ where: { id }, withDeleted: true });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    if (!blog.deletedAt) {
      throw new BadRequestException('Blog is not deleted');
    }
    await this.blogRepository.restore(id);
    return {
      statusCode: 200,
      message: 'Blog restored successfully',
    }
  }
}