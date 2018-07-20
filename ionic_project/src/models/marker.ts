import { LocationModel } from "./location";
import { Label } from "./label";
import { ParkingSpotModel } from "./parking_spot";
import { TipoZonaModel } from "./tipo_zona.model";

export class MarkerModel {
    private _num_free_spots: Label;

    constructor(public id:string,                
                public street: string,
                public tipo_zona: TipoZonaModel,
                public tarifa: string,
                public horario: string,
                public location: LocationModel,                
                public parkingSpotsList: ParkingSpotModel[]){                    
        this.setNumFreeSpots();
    }

    getAvailableSpots(){
        this.setNumFreeSpots();
        return this._num_free_spots.getLabel().text;
    }

    getMarkerByStreet(street:string){
        if(this.street == street)
            return this;
        return null;
    }

    getNumFreeSpots(){
        return this._num_free_spots;
    }
    setNumFreeSpots(){
        let num = 0;
        for(let spot of this.parkingSpotsList){
            if(spot.status == '1') num++;
        }
        this._num_free_spots = new Label(num + '');
    }
}