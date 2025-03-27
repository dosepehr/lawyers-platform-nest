import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  create(@Body() createBlogDto: CreateBlogDto, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1_000_000 }), // 1MB
        new FileTypeValidator({ fileType: 'image/*' }),
      ],
    }),
  ) file: Express.Multer.File) {
    return this.blogsService.create(createBlogDto, file);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }

  @Delete('/soft/:id')
  softDelete(@Param('id') id: string) {
    return this.blogsService.softDelete(+id);
  }

  @Delete('/hard/:id')
  hardDelete(@Param('id') id: string) {
    return this.blogsService.hardDelete(+id);
  }

  @Patch('/restore/:id')
  restore(@Param('id') id: string) {
    return this.blogsService.restore(+id);
  }
}
