export class Label {
      
    markerLabelObject = {
        color: "white",
        fontFamily: "arial",
        fontSize: "21px",
        fontWeight: "bold",
        text: ""        
    };

    constructor(public _text: string){        
        this.markerLabelObject.text = _text;
    }

    getLabel(){
        return this.markerLabelObject;
    }

    setFontSize(size: string){
        this.markerLabelObject.fontSize = size;
    }
}