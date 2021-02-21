import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl } from "@angular/forms"; //Para el formulario de registro.
import { Utilities } from 'src/app/shared/utilities';
import { MensajesFirebase } from 'src/app/shared/mensajesfirebase';
import { AuthService } from 'src/app/services/auth.service';
import { FontawesomeService } from 'src/app/services/fontawesome.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public lblError: string;
  public estaCargando: boolean;

  public typeInputPassword: string;
  public typeInputPasswordFaIcon: any;

  //Called first time before the ngOnInit()
  constructor(private router: Router, private authService: AuthService, public fontAwesome: FontawesomeService) {

    //Se inicializan los campos como string vacios
    this.lblError = "";
    this.estaCargando = false;

    this.typeInputPassword = "password";
    this.typeInputPasswordFaIcon = fontAwesome.faEye;
  }

  //Called after the constructor and called  after the first ngOnChanges()
  ngOnInit(): void { }

  //Variables del formulario. Los nombres de las variables, deben coincidir con los atributos "formControlName"
  //de cada input en el HTML.
  frmLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  async frmLogin_event() {
    try {
      this.lblError = "";
      this.estaCargando = true;

      const { email, password } = this.frmLogin.value;

      if (email == "" || password == "") {
        this.lblError = "Se deben ingresar los datos";
      } else {

        let result = this.authService.Login(email, password);

        await result.then((res) => {

          console.log(res);

          //comentarios cuando es stock:
          let esNuevo = res.additionalUserInfo?.isNewUser;  //boolean
          let perfil = res.additionalUserInfo?.profile; //undefined
          let providerID = res.additionalUserInfo?.providerId; //password
          let nombreUsuario = res.additionalUserInfo?.username; //undefined

          let credenciales = res.credential; //null

          let tipoOperacion = res.operationType;

          let nombre = res.user?.displayName; //null
          let hotmail = res.user?.email; //fabianjra@hotmai.com
          let esVerificado = res.user?.emailVerified; //false
          let esAnonimo = res.user?.isAnonymous; //false

          let fechaCreacion = res.user?.metadata.creationTime; //Wed, 27 Jan 2021 03:09:59 GMT
          let fechaUltimoIngreso = res.user?.metadata.lastSignInTime; //Mon, 15 Feb 2021 01:26:34 GMT

          let proveedorID = res.user?.providerId; //firebase

          let factorAuth = res.user?.multiFactor.enrolledFactors;

          let token = res.user?.refreshToken; //AOvuKvTUGWwXFvYfhfW..... (mas)
          let userID = res.user?.uid; //JYASERTDF...
          let numeroTelefono = res.user?.phoneNumber; //null
          let fotoURL = res.user?.photoURL; //null

          let providerData = res.user?.providerData; //objeto

          let tenantID = res.user?.tenantId; //null

          this.router.navigate(['mainmenu']);
        })
          .catch((err) => {

            let mensaje: string = MensajesFirebase.ObtenerMensajeErrorFB(err.code, err.message);
            this.lblError = mensaje;
          })
      }

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
    finally {
      this.estaCargando = false;
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
