import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../utils/config/multer.config';
import { ServiceFileUplaodValidatorPipePipe } from '../../utils/pipes/service-file-uplaod-validator-pipe.pipe';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { Role } from 'src/utils/enums/role.enum';
  @Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ], multerConfig))
  create(
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFiles(new ServiceFileUplaodValidatorPipePipe({
      requiredImage: true,
    }))
    files: { image?: Express.Multer.File[], video?: Express.Multer.File[] }
  ) {
    return this.servicesService.create(createServiceDto, files);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.servicesService.findOne(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ], multerConfig))
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadedFiles(new ServiceFileUplaodValidatorPipePipe({
      requiredImage: false,
    }))
    files: { image?: Express.Multer.File[], video?: Express.Multer.File[] }
  ) {
    return this.servicesService.update(+id, updateServiceDto, files);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
