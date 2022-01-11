import { Injectable } from '@angular/core';
import { first } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
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
    const result = (await this.afAuth.currentUser)?.updateProfile({ displayName: nombre, photoURL: ''});

    return result;
  }

  async CambiarPassword(nuevaPassword: string) {
    const result = (await this.afAuth.currentUser)?.updatePassword(nuevaPassword);

    return result;
  }

  async Logout() {
    await this.afAuth.signOut();
    //TODO: Redirigir afuera, eliminar localstorage, etc.
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
