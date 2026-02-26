import { IsString, MinLength } from 'class-validator'

export class UpdateProfileDto{
    @IsString()
    @MinLength(3)
    name: string;
    description: string;
}