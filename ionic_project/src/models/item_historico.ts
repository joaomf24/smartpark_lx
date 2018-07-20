export class ItemHistoricoModel{   
    
    constructor(public title: string, 
                public zona: string,
                public morada: string,
                public data:string,
                public hora:string,
                public matricula:string
            ){}        

    setHora(hora:string){
        this.hora = hora;
    }

    setData(data:string){
        this.data = data;
    }

}