export class Utilities {

    //PARAMS:
    //pStack: Stack del error (se corta el texto para solamente tomar el nombre del metodo).
    //pEX: Mensaje de error.
    //FUNCION: Escribe el mensaje de error en el log.
    public static LogErrorThrow(pStack: any, pEx: any) {

        let dispositivo = this.ObtenerDispositivo();
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

    //FUNCION: Consulta el navegador basandose en una lista ya preestablecida
    //RETURN: Nombre del navegador en formato string
    private static ObtenerNavegador() {

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

    //FUNCION: Consulta el dispositivo basandose en una lista ya preestablecida
    //RETURN: Nombre del dispositivo en formato string
    private static ObtenerDispositivo() {

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

    //Al realizar cualquier carga de pagina, se consulta el URL de la direccion actual
    //y se obtiene solamente el nombre de la pagina, en base a este nombre, se asigna como
    // actual, a la pagina correcta en el Navbar, como seleccion.
    private static RetornarPaginaActual() {

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

    public static ObtenerMensajeErrorFB(pCodigo: string, pMensaje: string): string {
        var mensaje: string = "";
        try {
            switch (pCodigo) {
                case "auth/invalid-email":
                    mensaje = "Email con formato invalido";
                    break;

                case "auth/wrong-password":
                    mensaje = "Email o contraseña incorrecta";
                    break;

                case "auth/user-not-found":
                    mensaje = "Email o contraseña incorrecta";
                    break;

                case "auth/too-many-requests":
                    mensaje = "Debido a varios intentos de ingreso, se ha bloqueado el usuario temporalmente. Puedes desbloquearlo restaurando la contraseña o puedes intentar ingresar más tarde";
                    break;

                case "auth/email-already-in-use":
                    mensaje = "El email ingreso ya se encuentra registrado";
                    break;

                default:
                    //Asigna el mensaje original en ingles, obtenido de firebase, en caso de no encontrar el codigo de error.
                    mensaje = pMensaje;
                    break;
            }
        } catch (error) {
            this.LogErrorThrow((new Error).stack, error);
        } finally {
            return mensaje;
        }
    }

}//FIN: Utilidades