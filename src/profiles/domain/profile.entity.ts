import { ApiProperty } from '@nestjs/swagger';

/**
 * Domain entity for Profile.
 * Plain class — no framework or ORM dependencies.
 * Business rules and invariants live here.
 */
export class Profile {
  @ApiProperty({
    description: 'Unique identifier of the profile',
    example: 'a3bb189e-8bf9-3888-9912-ace4e6543002',
  })
  readonly id: string;

  @ApiProperty({
    description: 'Display name of the profile',
    example: 'John Doe',
    minLength: 3,
    maxLength: 100,
  })
  name: string;

  @ApiProperty({
    description: 'Short bio or description of the profile',
    example: 'Full-stack developer passionate about open source',
  })
  description: string;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  /**
   * Factory: creates a new (unsaved) Profile with a temporary id placeholder.
   * The repository is responsible for persisting and returning the real id.
   */
  static create(name: string, description: string): Omit<Profile, 'id'> {
    return { name, description };
  }
}
