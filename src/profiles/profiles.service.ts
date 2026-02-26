import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto';

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

    findOne(id: string){
        return this.profiles.find((profile) => profile.id === id);
    }
}
