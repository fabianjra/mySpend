import { Injectable } from '@angular/core';
import { first } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';
// import { User } from 'firebase';
// import { auth } from 'firebase/app';

@Injectable()
export class AuthService {

  // public user: User;

  constructor(public afAuth: AngularFireAuth) { }

  async Login(email: string, password: string) {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        //Exitoso.
      })
      .catch((error) => {
        //Error.
        throw new Error(error);
      })

    return result;
  }

  //F: La contraseña debe validarse con minimo 6 caracteres.
  async Registrar(email: string, password: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        //Exitoso.
      })
      .catch((error) => {
        //Error.
        throw new Error(error);
      })

    return result;
  }

  async Logout() {
    await this.afAuth.signOut();
    //F: Redirigir afuera, eliminar localstorage, etc.
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
