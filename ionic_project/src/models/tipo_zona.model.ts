
export class TipoZonaModel{
    private _color:string;
    constructor(public text: string, public color: string){
        this._color = this.setColor(text);
    }

    setColor(text:string){
        if(text == "Vermelha") return 'danger';
        if(text == "Verde") return 'greenZone';
        if(text == "Amarela") return 'yellowZone';
        if(text == "Zona sem pagamento") return 'search';
    }

    getColor(){
        return this._color;
    }

    getText(lang:string){
        if(lang != "pt"){
            if(this.text == "Verde") return 'Green';
            if(this.text == "Vermelha") return 'Red';
            if(this.text == "Amarela") return 'Yellow';
            if(this.text == "Zona sem pagamento") return 'No parking fee';
        }
        else return this.text;
        
    }
    
}