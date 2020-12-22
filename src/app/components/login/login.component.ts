import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public lblError: string = "";
  public txtUsername: any;
  public txtPassword: any;

  constructor() {

  }

  IniciarSesion() {

    this.lblError = "";

    if (this.txtUsername == "" && this.txtPassword == "") {
      this.lblError = "Se deben ingresar los campos";
    }

  }

  ngOnInit(): void {
  }

}
