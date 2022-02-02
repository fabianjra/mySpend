import { Respuesta } from "../classes/respuesta";

export class Utilities {

    /**
     * Escribe el mensaje de error en consola (log).
     * @param pStack - Stack del error (se corta el texto para solamente tomar el nombre del metodo)
     * @param pEx - El exception del catch
     */
    public static LogErrorThrow(pStack: any, pEx: any) {

        let dispositivo = this.ObtenerDispositivo()
        let navegador = this.ObtenerNavegador();
        let nombrePagina = this.RetornarPaginaActual();

        let funcName = pStack.toString();
        funcName = funcName.substr('function '.length);
        funcName = funcName.substr(0, funcName.indexOf('('));
        funcName = funcName.substr(4, funcName.length);

        //Only console log
        let mensajeConsola = "ERROR CATCH| DISPOSITIVO: " + dispositivo + "| NAVEGADOR: " + navegador + "| PAGINA: " + nombrePagina + "| METODO: " + funcName + "| MENSAJE: " + pEx;
        console.error(mensajeConsola);

        //Envia el error a Goolge Analytics
        // let mensajeAnalytics = dispositivo + "| " + navegador + "| " + funcName + "| " + pEx.message;
        // ga('send', {
        //     hitType: 'event',
        //     eventCategory: 'EXCEPTION',
        //     eventAction: nombrePagina,
        //     eventLabel: mensajeAnalytics
        // });
    }

    /**
    *Consulta el navegador basandose en una lista ya preestablecida.
    * @returns Nombre del navegador en formato string
    */
    private static ObtenerNavegador(): string {

        let browserName = '';

        if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
            browserName = 'Opera';
        }
        else if (navigator.userAgent.indexOf("Chrome") != -1) {
            browserName = 'Chrome';
        }
        else if (navigator.userAgent.indexOf("Safari") != -1) {
            browserName = 'Safari';
        }
        else if (navigator.userAgent.indexOf("Firefox") != -1) {
            browserName = 'Firefox';
        }
        else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!(document as any).documentMode == true)) { //IF IE > 10
            browserName = 'IE';
        }
        else {
            browserName = 'Desconocido';
        }

        return browserName;
    }

    /**
     * Consulta el dispositivo basandose en una lista ya preestablecida.
     * @returns Nombre del dispositivo en formato string
     */
    private static ObtenerDispositivo(): string {

        let device = "desconocido";

        const ua: any = {
            "Generic Linux": /Linux/i,
            "Android": /Android/i,
            "BlackBerry": /BlackBerry/i,
            "Bluebird": /EF500/i,
            "Chrome OS": /CrOS/i,
            "Datalogic": /DL-AXIS/i,
            "Honeywell": /CT50/i,
            "iPad": /iPad/i,
            "iPhone": /iPhone/i,
            "iPod": /iPod/i,
            "macOS": /Macintosh/i,
            "Windows": /IEMobile|Windows/i,
            "Zebra": /TC70|TC55/i,
        }

        Object.keys(ua).map(v => navigator.userAgent.match(ua[v]) && (device = v));

        return device;
    }

    /**
     * Al realizar cualquier carga de pagina, se consulta el URL de la direccion actual
     * se obtiene solamente el nombre de la pagina, en base a este nombre, se asigna como
     * actual, a la pagina correcta en el Navbar, como seleccion.
     * @returns Nombre de la pagina en la que se encuentra el navegador
     */
    private static RetornarPaginaActual(): string {

        var nombrePagina = "InicializadaNull";

        var segmento = window.location.pathname.split('/');
        var borrar = [];

        for (let i = 0; i < borrar.length; i++) {
            if (segmento[i].length < 1) {
                borrar.push(i);
            }
        }

        for (let i = 0; i < borrar.length; i++) {
            segmento.splice(i, 1);
        }

        //Obtiene el nombre de la pagina, junto con el .html y todo lo que contenga despues del ultimo slash "/" (ejem: index.html, o: index.html?p=0)
        var nombreConHTML = segmento[segmento.length - 1];

        //Obtiene el nombre de la pagina, antes del .html (ejem: "index")
        nombrePagina = nombreConHTML.split('.')[0];

        if (nombrePagina == "" || nombrePagina == null) {
            nombrePagina = "index";
        }

        return nombrePagina;
    }

    /**
     * Obtiene el nombre de un mes, basado en un numero con valor "-1" al mes real.
     * @param pNumeroMes - Debe ser el numero del mes que se desea cosultar menos 1
     * @returns Nombre del mes
     */
    public static ObtenerNombreMes(pNumeroMes: number): string {

        var nombreMes: string = "";

        try {
            let meses: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

            for (let i = 0; i < meses.length; i++) {
                if (i == pNumeroMes) {
                    nombreMes = meses[i];
                }
            }
        } catch (error) {
            this.LogErrorThrow((new Error).stack, error);
        } finally {
            return nombreMes;
        }
    }

    /**
     * Agrega cierta cantidad de meses a una fecha y retorna la nueva fecha con la suma de los meses.
     * @param pFecha - Fecha a la que se le quiere sumar meses
     * @param pCantidad - Cantidad de meses que se le quiere sumar al la fecha
     * @returns Nueva fecha con la cantidad de meses sumada
     */
    public static SumaMesFecha(pFecha: Date, pCantidad: number): Date {

        let nuevaFecha: Date = pFecha;

        try {
            var d = nuevaFecha.getDate();
            nuevaFecha.setMonth(nuevaFecha.getMonth() + +pCantidad);

            if (nuevaFecha.getDate() != d) {
                nuevaFecha.setDate(0);
            }

        } catch (error) {
            this.LogErrorThrow((new Error).stack, error);
        } finally {
            return nuevaFecha;
        }
    }

    /**
     * Resta cierta cantidad de meses a una fecha y retorna la nueva fecha con la resta de los meses.
     * @param pFecha - Fecha a la que se le quiere restar meses
     * @param pCantidad - Cantidad de meses que se le quiere restar al la fecha
     * @returns Nueva fecha con la cantidad de meses restada
     */
    public static RestaMesFecha(pFecha: Date, pCantidad: number): Date {

        let nuevaFecha: Date = pFecha;

        try {
            var d = nuevaFecha.getDate();
            nuevaFecha.setMonth(nuevaFecha.getMonth() + +pCantidad);

            if (nuevaFecha.getDate() != d) {
                nuevaFecha.setDate(0);
            }

        } catch (error) {
            this.LogErrorThrow((new Error).stack, error);
        } finally {
            return nuevaFecha;
        }
    }

    /**
     * Realiza un trim a un texto.
     * @param texto - Texto al que se le quiere realizar el trim.
     * @returns  Si el texto esta vacio, nullo o undefined, retorna un string vacio.
     */
    public static TrimTexto(texto: string): string {
        if (this.StringConContenido(texto)) {
            return texto.replace(/^\s+|\s+$/gm, '');
        } else {
            return "";
        }
    }

    /**
     * Valida que un string no esté vacio.
     * @param texto - Texto al que se le quiere realizar la validacion de vacio.
     * @returns  Si el texto esta vacio, nullo o undefined, retorna un False.
     */
    public static StringConContenido(texto: string): Boolean {
        if (texto == "" || texto == '' || texto == undefined || texto == null) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Valida que una contraseña sea correcta. En caso de haber un error, envia el codigo de error y la respuesta.
     * @param password Contraseña a la que se le requiren validar los caracteres.
     * @returns Obejto respuesta: Codigo de respuesta (0 = correcto). Mensaje Respuesta (msj error en caso de haberlo).
     */
    public static ValidarPassword(password: string) {
        let res: Respuesta = new Respuesta(0, "Contraseña válida");

        if (this.StringConContenido(password) == false) {
            res.CodigoRespuesta = 99;
            res.MensajeRespuesta = "Se deben ingresar los datos";

        } else if (password.length < 6) {
            res.CodigoRespuesta = 99;
            res.MensajeRespuesta = "La contraseña debe tener al menos 6 caracteres";

        } else if (password.length > 20) {
            res.CodigoRespuesta = 99;
            res.MensajeRespuesta = "La contraseña no debe tener más de 20 caracteres";

        }

        return res;
    }

    /**
     * Valida que un grupo de contraseñas sean correctas. En caso de haber un error, envia el codigo de error y la respuesta.
     * @param passwordList Grupo de contraseñas a la que se le requiren validar los caracteres.
     * @returns Obejto respuesta: Codigo de respuesta (0 = correcto). Mensaje Respuesta (msj error en caso de haberlo).
     */
    public static ValidarGrupoPasswords(passwordList: Array<string>) {
        let res: Respuesta = new Respuesta(0, "Todas las contraseñas son válidas");

        for (let index = 0; index < passwordList.length; index++) {

            let resIndex = this.ValidarPassword(passwordList[index]);

            if (resIndex.CodigoRespuesta != 0) {
                res.CodigoRespuesta = resIndex.CodigoRespuesta;
                res.MensajeRespuesta = resIndex.MensajeRespuesta;
                return res;
            }
        }

        return res;
    }

}//FIN: Utilidades