import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
    private profiles = [
        {
            id: randomUUID(),
            name: "Juan",
            description: "ferferferferfer"
        },
        {
            id: randomUUID(),
            name: "Leo",
            description: "ferferferferfer"
        },
        {
            id: randomUUID(),
            name: "Linkin Park",
            description: "ferferferferfer"
        },
        {
            id: randomUUID(),
            name: "SQL",
            description: "ferferferferfer"
        }
    ]
    findAll(){
        return this.profiles;
    }

    create(profile: CreateProfileDto){
        const createdProfile = {
            id: randomUUID(),
            ...profile
        }
        this.profiles.push(createdProfile);
    }

    update(id: string, updateProfileDto: UpdateProfileDto){
        const matchingProfile = this.profiles.find((profile) => profile.id === id);

        if(!matchingProfile){
            return {};
        }
        
        matchingProfile.name = updateProfileDto.name;
        matchingProfile.description = updateProfileDto.description;

        return matchingProfile;
    }

    remove(id: string): void{
        const matchingProfileIndex = this.profiles.findIndex((profile) => profile.id === id)

        if (matchingProfileIndex > -1){
            this.profiles.splice(matchingProfileIndex, 1);
        }
        
    }

    findOne(id: string){
        return this.profiles.find((profile) => profile.id === id);
    }
}
