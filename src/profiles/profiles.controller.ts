import { Controller, Get, Query, Param } from '@nestjs/common';

@Controller('profiles')
export class ProfilesController {

   @Get()
   findAll(@Query('location') location: string){
     return [{location}];
   }

   @Get(':id')
   findOne(@Param('id') id: string){
    return {id};
   }

}
