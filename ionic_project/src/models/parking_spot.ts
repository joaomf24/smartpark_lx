
import { LocationModel } from "./location";

export class ParkingSpotModel {

    constructor(public id: string,                
                public location: LocationModel,
                public status: string){}

    getSpotById(id:string){
        if(this.id = id)
            return this;
        return null;
    }
    
}