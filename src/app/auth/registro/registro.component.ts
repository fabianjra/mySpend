import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from "@angular/forms"; //Para el formulario de registro.
import { Utilities } from 'src/app/shared/utilities';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //F: PARA REGISTRO DE USUARIO
  formRegistro = new FormGroup({
    txtEmail: new FormControl(''),
    txtPassword: new FormControl(''),
    txtPasswordConfirm: new FormControl('')
  });

  //FontAwesome
  faUser = faUser;
  faLock = faLock;
  faCheck = faCheck;

  public lblError: string;

  constructor(private router: Router) {

    this.lblError = "";
  }

  Registrarse_click() {
    try {
      this.lblError = "";

      // if (this.txtUsername == "" || this.txtPassword == "" || this.txtPasswordConfirm == "") {
      //   this.lblError = "Se debe ingresar el usuario y contraseña";
      // }
      // else {
      //   if (this.txtPassword != this.txtPasswordConfirm) {
      //     this.lblError = "La contraseña y la confirmación no coinciden";
      //   }
      //   else {
      //     //F: registro en firebase
      //   }

      // }

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

  frmRegistro_event() {
    console.log("formulario: ", this.formRegistro.value);
  }

  txtUsername_changed(): void {
    this.lblError = "";
  }

  txtPassword_changed(): void {
    this.lblError = "";
  }

  txtPasswordConfirm_changed(): void {
    this.lblError = "";
  }

  ngOnInit(): void {
  }

}
