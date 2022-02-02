import { Respuesta } from "./respuesta"

export class UsuarioVerificadoRes extends Respuesta {
    private esVerificado: boolean;

    constructor(CodigoRespuesta: number, MensajeRespuesta: string) {
        super(CodigoRespuesta, MensajeRespuesta)
        this.esVerificado = false;
    }

    public get EsVerificado(): boolean {
        return this.esVerificado;
    }

    public set EsVerificado(valor: boolean) {
        this.esVerificado = valor;
    }

}