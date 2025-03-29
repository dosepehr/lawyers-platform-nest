import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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

    @IsString()
    @IsNotEmpty()
    service: string;

    @IsString()
    @IsNotEmpty()
    tags: string;
}
