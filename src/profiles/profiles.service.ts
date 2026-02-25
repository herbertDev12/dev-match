import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

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

    findOne(id: string){
        return this.profiles.find((profile) => profile.id === id);
    }
}
