import { Controller, Get, Query, Param, Post, Body, Put, Delete, HttpStatus, HttpCode, NotFoundException  } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto} from './dto/update-profile.dto';
import {ProfilesService} from './profiles.service'

@Controller('profiles')
export class ProfilesController {

  constructor(private profilesService: ProfilesService){}

   @Get()
   findAll(){
     return this.profilesService.findAll();
   }

   @Get(':id')
   findOne(@Param('id') id: string){
    try {
      return this.profilesService.findOne(id);
    } catch(error){
      return new NotFoundException(`Profile with ID ${id} not found.`);
    }
   }

   @Post()
   create(@Body() createProfileDto: CreateProfileDto){
    return this.profilesService.create(createProfileDto);
   }

   @Put(':id')
   update(
    @Param('id') id:string, 
    @Body() updateProfileDto: UpdateProfileDto){
      return this.profilesService.update(id, updateProfileDto)
    }
   
   @Delete(':id')
   @HttpCode(HttpStatus.NO_CONTENT)
   remove(@Param('id') id: string) {
    this.profilesService.remove(id);
   }
}
