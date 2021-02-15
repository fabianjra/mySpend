import { Injectable } from '@angular/core';
import { first } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
// import { User } from 'firebase';
// import { auth } from 'firebase/app';

@Injectable()
export class AuthService {

  // public user: User;

  public userData$: Observable<any>; //F: Debe ser <firebase.User>

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

  async Logout() {
    await this.afAuth.signOut();
    //F: Redirigir afuera, eliminar localstorage, etc.
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
