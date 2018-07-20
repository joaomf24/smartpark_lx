import { MarkerModel } from "./marker";

export class ZonaModel {
    constructor(public id: string, 
                public description: string,
                public markersList: MarkerModel[]){}

    getElementByDescription(description:string){
        if(this.description == description){                        
            return this;
        }
            
        return null;
    }

    getMarkersList(){
        return this.markersList;
    }

    hasMarker(marker:MarkerModel){
        return this.markersList.indexOf(marker) > -1;
    }
}