import { Utilities } from "./utilities";

export class MensajesFirebase {

    /**
     * Obtiene el mensaje de error de Firebase, en base a un codigo en palabras.
     * @param pCodigo - Codigo que brinda firebase en una promesa
     * @param pMensaje - mensaje que brinda firebase al llamado de una promesa (este se utiliza para el set en caso que de que
     * no se encuentre el codigo del mensaje, se setea el mensaje que brinda firebase)
     * @returns Mensaje del error en español
     */
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

                case "auth/network-request-failed":
                    mensaje = "Problemas con la conexión a internet";
                    break;

                default:
                    //Asigna el mensaje original en ingles, obtenido de firebase, en caso de no encontrar el codigo de error.
                    mensaje = pMensaje;
                    break;
            }
        } catch (error) {
            Utilities.LogErrorThrow((new Error).stack, error);
        } finally {
            console.log("Mensaje original firebase: " + pMensaje);
            return mensaje;
        }
    }
}