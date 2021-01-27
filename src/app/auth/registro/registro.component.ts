import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faLock, faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from "@angular/forms"; //Para el formulario de registro.
import { Utilities } from 'src/app/shared/utilities';
import { NavbarService } from 'src/app/services/navbar.service';
import { Location } from '@angular/common'; //Para volver atras
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  private txtNombre: any;
  private txtApellido: any;
  private txtEmail: any;
  private txtPassword: any;
  private txtPasswordConfirm: any;

  //F: PARA REGISTRO DE USUARIO
  formRegistro = new FormGroup({
    txtNombre: new FormControl(''),
    txtApellido: new FormControl(''),
    txtEmail: new FormControl(''),
    txtPassword: new FormControl(''),
    txtPasswordConfirm: new FormControl('')
  });

  //FontAwesome
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faCheck = faCheck;

  public lblError: string;

  constructor(
    private router: Router,
    private nav: NavbarService,
    private location: Location,
    private authService: AuthService) {

    this.lblError = "";
    this.txtNombre = this.formRegistro.controls['txtNombre'];
    this.txtApellido = this.formRegistro.controls['txtApellido'];
    this.txtEmail = this.formRegistro.controls['txtEmail'];
    this.txtPassword = this.formRegistro.controls['txtPassword'];
    this.txtPasswordConfirm = this.formRegistro.controls['txtPasswordConfirm'];
  }

  VolverAtras_click() {
    this.location.back();
  }

  frmRegistro_event() {
    try {

      //Asignacion de variables
      let nombre = this.txtNombre.value;
      let email = this.txtEmail.value;
      let password = this.txtPassword.value;
      let confirm = this.txtPasswordConfirm.value;

      this.lblError = "";

      if (nombre == "" || email == "" || password == "" || confirm == "") {
        this.lblError = "Se deben ingresar los datos";
      } else {
        if (password != confirm) {
          this.lblError = "La contraseña y la confirmación no coinciden";
        } else {

          //Obtener las variables directamtne del Form.
          //const {txtEmail, txtPasswordConfirm} = this.formRegistro.value;

          this.authService.Registrar(email, confirm);

          this.lblError = "registro en construcción";
        }
      }

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

  txt_changed(): void {
    this.lblError = "";
  }

  ngOnInit(): void {
    this.nav.show();
  }

}
