import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl } from "@angular/forms"; //Para el formulario de registro.
import { Utilities } from 'src/app/shared/utilities';
import { AuthService } from 'src/app/services/auth.service';
import { FontawesomeService } from 'src/app/services/fontawesome.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public lblError: string;
  public typeInputPassword: string;
  public typeInputPasswordFaIcon: any;

  //Variables del formulario. Los nombres de las variables, deben coincidir con los atributos "formControlName"
  //de cada input en el HTML.
  frmLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  //Called first time before the ngOnInit()
  constructor(private router: Router, private authService: AuthService, public fontAwesome: FontawesomeService) {

    //Se inicializan los campos como string vacios
    this.lblError = "";
    this.typeInputPassword = "password";
    this.typeInputPasswordFaIcon = fontAwesome.faEye;
  }

  //Called after the constructor and called  after the first ngOnChanges()
  ngOnInit(): void {
  }

  frmLogin_event() {
    try {
      this.lblError = "";
      const { email, password } = this.frmLogin.value;

      if (email == "" || password == "") {
        this.lblError = "Se deben ingresar los datos";
      } else {

        let result = this.authService.Login(email, password);

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

  text_changed(): void {
    this.lblError = "";
  }

  //FUNCION: Cambia el type del input Password a Text y viceversa.
  //Cambia el icono de "faEye", dependiendo si el input es type Password o Text.
  ToggleShowPassword() {
    try {

      //Se realiza el cambio de color a negro o transparente, solamente cuando sea un telefono o pantalla pequeña.
      if (this.typeInputPassword == "password") {
        this.typeInputPassword = "text";
        this.typeInputPasswordFaIcon = this.fontAwesome.faEyeSlash;
      } else {
        this.typeInputPassword = "password";
        this.typeInputPasswordFaIcon = this.fontAwesome.faEye;
      }
    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

}
