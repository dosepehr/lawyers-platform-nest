import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../utils/config/multer.config';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { RolesGuard } from 'src/utils/guards/roles.guard';
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
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

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.blogsService.findOne(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto, @UploadedFile() file: Express.Multer.File) {
    return this.blogsService.update(+id, updateBlogDto, file);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/soft/:id')
  softDelete(@Param('id') id: string) {
    return this.blogsService.softDelete(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/hard/:id')
  hardDelete(@Param('id') id: string) {
    return this.blogsService.hardDelete(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch('/restore/:id')
  restore(@Param('id') id: string) {
    return this.blogsService.restore(+id);
  }
}
