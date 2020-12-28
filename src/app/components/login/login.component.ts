import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public lblError: string;
  public txtUsername: string;
  public txtPassword: string;

  constructor() {

    //Se inicializan los campos como string vacios
    this.lblError = "";
    this.txtUsername = "";
    this.txtPassword = "";
  }

  IniciarSesion() {
    try {
      this.lblError = "";

      if (this.txtUsername == "" || this.txtPassword == "") {
        this.lblError = "Se debe ingresar el usuario y contraseña";
      }
      else {
        //F: Consulta en firebase
        //window.location = "mainmenu.html";
      }

    } catch (error) {
      //uEscribirError(arguments, ex);
    }
  }

  txtUsernameChanged(): void {
    this.lblError = "";
  }

  txtPasswordChanged(): void {
    this.lblError = "";
  }

  ngOnInit(): void {
  }

}
