import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    description: 'The name of the profile',
    example: 'John Doe',
    minLength: 3,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiPropertyOptional({
    description: 'A short description of the profile',
    example: 'Full-stack developer passionate about open source',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
