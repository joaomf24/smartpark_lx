import { ZonaModel } from "./zona";
import { MarkerModel } from "./marker";

export class FavoritoModel {
    private _marker:MarkerModel;
    private _zona:ZonaModel;

    constructor(public nome: string, 
                public zona: ZonaModel,
                public marker: MarkerModel){
        this._marker = marker;
        this._zona = zona;
    }

    getMarker(){
        return this._marker;
    }

    getZona(){
        return this._zona;
    }
}