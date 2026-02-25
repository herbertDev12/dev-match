import { Controller, Get, Query, Param, Post, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
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
    return this.profilesService.findOne(id);
   }

   @Post()
   create(@Body() createProfileDto: CreateProfileDto){
    return{
      name: createProfileDto.name,
      description: createProfileDto.description,
    }
   }

   @Put(':id')
   update(
    @Param('id') id:string, 
    @Body() updateProfileDto: UpdateProfileDto){
      return{
        id,
        ...updateProfileDto
      }    
    }
   
   @Delete(':id')
   @HttpCode(HttpStatus.NO_CONTENT)
   remove(@Param('id') id: string) {}
}
