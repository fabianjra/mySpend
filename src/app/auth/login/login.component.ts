import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from "@angular/forms"; //Para el formulario de registro.
import { Utilities } from 'src/app/shared/utilities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //F: PARA REGISTRO DE USUARIO
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  //FontAwesome
  faEnvelope = faEnvelope;
  faLock = faLock;

  public lblError: string;
  public txtUsername: string;
  public txtPassword: string;

  //Called first time before the ngOnInit()
  constructor(private router: Router) {

    //Se inicializan los campos como string vacios
    this.lblError = "";
    this.txtUsername = "";
    this.txtPassword = "";
  }

  IniciarSesion_click() {
    try {
      this.lblError = "";

      if (this.txtUsername == "" || this.txtPassword == "") {
        this.lblError = "Se debe ingresar el usuario y contraseña";
      } else {
        //F: Consulta en firebase
        this.router.navigate(['mainmenu']);
      }

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

  Registrarse_click() {
    try {
      this.router.navigate(['registro']);
    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

  txtUsername_changed(): void {
    this.lblError = "";
  }

  txtPassword_changed(): void {
    this.lblError = "";
  }

  //Called after the constructor and called  after the first ngOnChanges()
  ngOnInit(): void {
  }

}
