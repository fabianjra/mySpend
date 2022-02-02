import { Injectable } from '@angular/core';
import { first } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UsuarioVerificadoRes } from '../classes/usuarioVerificadoRes';
import { MensajesFirebase } from '../shared/mensajesfirebase';
import { Respuesta } from '../classes/respuesta';
// import { User } from 'firebase';
// import { auth } from 'firebase/app';

// import User from 'firebase';
import firebase from 'firebase/app';
import "firebase/auth";

@Injectable()
export class AuthService {

  // public user: User;

  public userData$: Observable<any>; //TODO: Debe ser <firebase.User>

  constructor(public afAuth: AngularFireAuth) {
    this.userData$ = this.afAuth.authState;
  }

  async Login(email: string, password: string) {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);

    return result;
  }

  async Registrar(email: string, password: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);

    return result;
  }

  async CambiarNombre(nombre: string) {
    const result = (await this.afAuth.currentUser)?.updateProfile({ displayName: nombre, photoURL: '' });

    return result;
  }

  //TODO: Agregar clase de respuesta para manejo de mensajes y codigos de respuesta.
  async CambiarPassword(oldPassword: string, newPassword: string): Promise<Respuesta> {
    let respuesta: Respuesta = new Respuesta(99, "Ocurrió un error al realizar el proceso");

    let currentUserEmail: string = (await this.getCurrentUser())?.email!; //El simbolo ! significa: creame, el valor no va a venir nulo.
    let credenciales = firebase.auth.EmailAuthProvider.credential(currentUserEmail, oldPassword);

    //Se llama al metodo de reautenticar el usuario con la contraseña digitada, si es correcta, se procese a hacer el update.
    await this.afAuth.authState.pipe(first()).toPromise()
      .then(async (resAuth) => {

        await resAuth?.reauthenticateWithCredential(credenciales)
          .then(async (resReautenticar) => {

            await resAuth.updatePassword(newPassword)
              .then((resUpdatePassword) => {
                //Respuesta correcto, se cambio la contraseña.
                respuesta.CodigoRespuesta = 0;
                respuesta.MensajeRespuesta = "La contraseña se actualizó correcatamente"
              })
              .catch((errUpdatePassword) => {
                //Error al hacer actualizacion de password.
                respuesta.CodigoRespuesta = 99;
                respuesta.MensajeRespuesta = MensajesFirebase.ObtenerMensajeErrorFB(errUpdatePassword.code, errUpdatePassword.message);
              })

          })
          .catch((errReautenticar) => {
            //Error al reautenticar el usuario
            respuesta.CodigoRespuesta = 99;
            respuesta.MensajeRespuesta = MensajesFirebase.ObtenerMensajeErrorFB(errReautenticar.code, errReautenticar.message);
          })

      })
      .catch((errAuth) => {
        respuesta.CodigoRespuesta = 99;
        respuesta.MensajeRespuesta = MensajesFirebase.ObtenerMensajeErrorFB(errAuth.code, errAuth.message);
      })

    return respuesta;
  }

  async EsUsuarioVerificado(): Promise<UsuarioVerificadoRes> {
    let resUsuario: UsuarioVerificadoRes = new UsuarioVerificadoRes(0, "La cuenta no se encuentra validada, por favor valide su cuenta por medio de la opción: Validar cuenta");
    resUsuario.EsVerificado = false;

    await this.afAuth.authState.pipe(first()).toPromise()
      .then((res) => {
        resUsuario.EsVerificado = res?.emailVerified as boolean;

        if (res?.emailVerified) {
          resUsuario.MensajeRespuesta = "La cuenta está verificado";
        }
      })
      .catch((err) => {
        resUsuario.CodigoRespuesta = 99;
        resUsuario.MensajeRespuesta = MensajesFirebase.ObtenerMensajeErrorFB(err.code, err.message);
      })

    return resUsuario
  }

  async EnviarVerificacionUsuario(): Promise<Respuesta> {
    let respuestaFinal: Respuesta = new Respuesta(99, "Ocurrió un error al realizar el proceso");

    await this.afAuth.authState.pipe(first()).toPromise()
      .then((res) => {
        res?.sendEmailVerification()
          .then((resEnviar) => {
            respuestaFinal.CodigoRespuesta = 0;
            respuestaFinal.MensajeRespuesta = "Email enviado correctamente";
          })
          .catch((errEnviar) => {
            respuestaFinal.CodigoRespuesta = 99;
            respuestaFinal.MensajeRespuesta = errEnviar;
          })

      })
      .catch((err) => {
        respuestaFinal.CodigoRespuesta = 99;
        respuestaFinal.MensajeRespuesta = err;
      })

    return respuestaFinal;
  }

  async Logout() {
    await this.afAuth.signOut();
    //TODO: Redirigir afuera, eliminar localstorage, etc.
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
