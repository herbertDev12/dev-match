import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ProfilesService } from '../application/profiles.service';
import { CreateProfileDto } from '../application/dto/create-profile.dto';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { Profile } from '../domain/profile.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthUser } from '../../auth/dto/jwt-payload.interface';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all profiles' })
  @ApiOkResponse({
    type: Profile,
    isArray: true,
    description: 'List of all profiles',
  })
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a profile by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the profile', format: 'uuid' })
  @ApiOkResponse({
    type: Profile,
    description: 'The profile with the given ID',
  })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.profilesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new profile' })
  @ApiCreatedResponse({
    type: Profile,
    description: 'The newly created profile',
  })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing profile' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the profile to update',
    format: 'uuid',
  })
  @ApiOkResponse({ type: Profile, description: 'The updated profile' })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a profile' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the profile to delete',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Profile successfully deleted' })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() _user: AuthUser,
  ) {
    await this.profilesService.remove(id);
  }
}
