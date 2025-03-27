import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    slug: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    image: Express.Multer.File;

    @IsOptional()
    @IsString()
    video: Express.Multer.File;

    @IsNotEmpty()
    @IsString()
    tags: string;
}
