import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ServiceFileUplaodValidatorPipePipe implements PipeTransform {
  constructor(private readonly config: {
    requiredImage: boolean,
  }) { }
  transform(value: { image?: Express.Multer.File[], video?: Express.Multer.File[] }, metadata: ArgumentMetadata) {
    // Check if image exists (required)
    if (this.config.requiredImage && (!value?.image || value.image.length === 0)) {
      throw new BadRequestException('Image is required');
    }

    // Validate image
    const image = value?.image?.[0];
    if (image && image.size > 1024 * 1024) { // 1MB
      throw new BadRequestException('Image size must be less than 1MB');
    }
    if (image && !image.mimetype.match(/^image\/(jpeg|png|gif|jpg)$/)) {
      throw new BadRequestException('Invalid image format. Allowed formats: jpeg, png, gif, jpg');
    }

    // Validate video if present
    if (value?.video && value?.video?.length > 0) {
      const video = value.video[0];
      if (video.size > 5 * 1024 * 1024) { // 5MB
        throw new BadRequestException('Video size must be less than 5MB');
      }
      if (video.mimetype !== 'video/mp4') {
        throw new BadRequestException('Invalid video format. Only MP4 is allowed');
      }
    }

    return value;
  }
}
