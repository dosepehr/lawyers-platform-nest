import { IsNotEmpty, IsString } from "class-validator";

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

    @IsNotEmpty()
    @IsString()
    image: string;

    @IsNotEmpty()
    @IsString()
    video: string;

    @IsNotEmpty()
    @IsString()
    tags: string;
}
