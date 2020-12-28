import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //FontAwesome
  faUser = faUser;
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

  IniciarSesion() {
    try {
      this.lblError = "";

      if (this.txtUsername == "" || this.txtPassword == "") {
        this.lblError = "Se debe ingresar el usuario y contraseña";
      } else {
        //F: Consulta en firebase
        this.router.navigate(['mainmenu']);
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

  //Called after the constructor and called  after the first ngOnChanges()
  ngOnInit(): void {
  }

}
