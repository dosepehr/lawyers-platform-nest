import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Blog } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService],
  imports: [TypeOrmModule.forFeature([Blog])],
})
export class BlogsModule { }
