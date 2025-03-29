import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseType } from 'src/utils/types/response.interface';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>
  ) { }

  create(createServiceDto: CreateServiceDto, files: { image?: Express.Multer.File[], video?: Express.Multer.File[] }) {
    const service = this.serviceRepository.create({
      ...createServiceDto,
      image: files.image?.[0].path,
      video: files.video?.[0].path
    });
    return this.serviceRepository.save(service);
  }

  async findAll(): Promise<ResponseType<Service[]>> {
    const services = await this.serviceRepository.find();
    return {
      statusCode: 200,
      message: 'Services fetched successfully',
      data: services,
      count: services?.length
    };
  }

  async findOne(slug: string): Promise<ResponseType<Service>> {
    const service = await this.serviceRepository.findOne({ where: { slug } });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return {
      statusCode: 200,
      message: 'Service fetched successfully',
      data: service
    };
  }
  async findOneById(id: number): Promise<ResponseType<Service>> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return {
      statusCode: 200,
      message: 'Service fetched successfully',
      data: service
    };
  }
  async update(id: number, updateServiceDto: UpdateServiceDto, files?: { image?: Express.Multer.File[], video?: Express.Multer.File[] }): Promise<ResponseType<Service>> {
    await this.findOneById(id);

    const updateData = { ...updateServiceDto };

    // Update file paths if new files are uploaded
    if (files?.image?.[0]) {
      updateData.image = files.image[0].path;
    }
    if (files?.video?.[0]) {
      updateData.video = files.video[0].path;
    }

    await this.serviceRepository.update(id, updateData);
    return {
      statusCode: 200,
      message: 'Service updated successfully',
    };
  }

  async remove(id: number) {
    await this.findOneById(id);
    await this.serviceRepository.delete(id);
    return {
      statusCode: 200,
      message: 'Service deleted successfully',
    };
  }
}
