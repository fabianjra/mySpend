import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from "@angular/forms"; //Para el formulario de registro.
import { Utilities } from 'src/app/shared/utilities';
import { NavbarService } from 'src/app/services/navbar.service';
import { Location } from '@angular/common'; //Para volver atras
import { AuthService } from 'src/app/services/auth.service';
import { FontawesomeService } from 'src/app/services/fontawesome.service';
import { MensajesFirebase } from 'src/app/shared/mensajesfirebase';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public lblError: string;
  public lblMensajeFinalRegistro: string;
  public estaCargando: boolean;

  constructor(
    private router: Router,
    private nav: NavbarService,
    private location: Location,
    private authService: AuthService,
    public fontAwesome: FontawesomeService,
    private modalService: NgbModal) {

    this.lblError = "";
    this.lblMensajeFinalRegistro = "";
    this.estaCargando = false;
  }

  ngOnInit(): void {
    this.nav.show();
  }

  //Variables del formulario. Los nombres de las variables, deben coincidir con los atributos "formControlName"
  //de cada input en el HTML.
  frmRegistro = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
  });

  IrAlInicio_click() {
    // this.location.back();
    this.router.navigate(['home']);
  }

  async frmRegistro_event(contenidoModal: any) {
    try {
      this.lblError = "";
      this.lblMensajeFinalRegistro = "";
      this.estaCargando = true;

      //Obtener las variables directamtne del Form.
      const { nombre, email, password, passwordConfirm } = this.frmRegistro.value;

      if (nombre == "" || email == "" || password == "" || passwordConfirm == "") {
        this.lblError = "Se deben ingresar los datos";

      } else if (String(password).length < 6) {
        this.lblError = "La contraseña debe tener al menos 6 caracteres";

      } else if (String(password).length > 20) {
        this.lblError = "La contraseña no debe tener más de 20 caracteres";
        
      } else if (password != passwordConfirm) {
        this.lblError = "La contraseña y la confirmación no coinciden";

      } else {
        let result = this.authService.Registrar(email, passwordConfirm);

        await result.then((res) => {

          //se registra el nombre de usuario:
          res.user?.updateProfile({ displayName: nombre, photoURL: "" });
          res.user?.sendEmailVerification();

          // res.user?.updatePhoneNumber()

          this.lblMensajeFinalRegistro = "¡Felicidades " + nombre + "!";
          this.modalService.open(contenidoModal, { centered: true, ariaLabelledBy: 'modal-basic-title', windowClass: 'modalRegistro' }).result
            .then((result) => {

            })
            .catch((err) => {
              this.lblError = "Ocurrió un error al cargar los datos, por favor intente nuevamente." + err.message;
            });
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

  btnRegistroExitoso_click(): void {
    this.router.navigate(['home']);
    this.modalService.dismissAll();
  }

  txt_changed(): void {
    this.lblError = "";
  }

}
