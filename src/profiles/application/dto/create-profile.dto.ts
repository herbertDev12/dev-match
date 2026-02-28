import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    description: 'The name of the profile',
    example: 'John Doe',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    description: 'A short description of the profile',
    example: 'Full-stack developer passionate about open source',
  })
  @IsString()
  description: string;
}
