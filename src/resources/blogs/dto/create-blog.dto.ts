import { IsNotEmpty, IsString } from "class-validator";

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    writer: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    tags: string;
}
