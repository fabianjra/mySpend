import { Injectable } from '@angular/core';
import { first } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UsuarioVerificadoRes } from '../classes/usuarioVerificadoRes';
import { MensajesFirebase } from '../shared/mensajesfirebase';
import { Respuesta } from '../classes/respuesta';
// import { User } from 'firebase';
// import { auth } from 'firebase/app';

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

  async CambiarPassword(nuevaPassword: string) {
    const result = (await this.afAuth.currentUser)?.updatePassword(nuevaPassword);

    return result;
  }

  async EsUsuarioVerificado(): Promise<UsuarioVerificadoRes> {
    let resUsuario: UsuarioVerificadoRes = new UsuarioVerificadoRes();
    resUsuario.CodigoRespuesta = 0;
    resUsuario.MensajeRespuesta = "La cuenta no se encuentra validada, por favor valide su cuenta por medio de la opción: Validar cuenta";
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
    let respuestaFinal: Respuesta = new Respuesta();

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
