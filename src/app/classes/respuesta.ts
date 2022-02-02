export class Respuesta {
    private codigoRespuesta: number;
    private mensajeRespuesta: string;

    constructor(CodigoRespuesta: number, MensajeRespuesta: string){
        this.codigoRespuesta = CodigoRespuesta;
        this.mensajeRespuesta = MensajeRespuesta;
    }

    // constructor() {
    //     this.codigoRespuesta = 0;
    //     this.mensajeRespuesta = "";
    // }

    public get CodigoRespuesta(): number {
        return this.codigoRespuesta;
    }

    public get MensajeRespuesta(): string {
        return this.mensajeRespuesta;
    }

    public set CodigoRespuesta(valor: number) {
        this.codigoRespuesta = valor;
    }

    public set MensajeRespuesta(valor: string) {
        this.mensajeRespuesta = valor;
    }
}