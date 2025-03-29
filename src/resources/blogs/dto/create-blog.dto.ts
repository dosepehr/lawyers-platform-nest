import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Service } from "src/resources/services/entities/service.entity";

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    writer: string;

    @IsOptional()
    @IsString()
    image: string;

    @IsNotEmpty()
    serviceId: number;

    @IsString()
    @IsNotEmpty()
    tags: string;
}
