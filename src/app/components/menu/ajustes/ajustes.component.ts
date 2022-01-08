import { FontawesomeService } from 'src/app/services/fontawesome.service';
import { MensajesFirebase } from 'src/app/shared/mensajesfirebase';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from "@angular/forms"; //Para el formulario de registro.
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utilities } from 'src/app/shared/utilities';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {

  public lblError: string;
  public estaCargando: boolean;
  public registroExitoso: boolean;
  public nombreActual: any;
  public nuevoNombreTrim: string;

  constructor(private router: Router,
    public fontAwesome: FontawesomeService,
    private authService: AuthService,
    private modalService: NgbModal) {
    this.lblError = "";
    this.estaCargando = false;
    this.registroExitoso = false;
    this.nombreActual = "";
    this.nuevoNombreTrim = "";
    this.frmRegistro.controls['nombreActual'].disable();
  }

  ngOnInit(): void {
    try {
      this.CargarNombreUsuario();
    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

  CargarNombreUsuario(): void {
    //Carga el nombre del usuario actual
    let result = this.authService.getCurrentUser();

    result.then((res) => {
      this.nombreActual = res?.displayName;
    })
      .catch((err) => {
        let mensaje: string = MensajesFirebase.ObtenerMensajeErrorFB(err.code, err.message);
        this.lblError = mensaje;
      })
  }

  //Variables del formulario. Los nombres de las variables, deben coincidir con los atributos "formControlName"
  //de cada input en el HTML.
  frmRegistro = new FormGroup({
    nombreActual: new FormControl(''),
    nombreNuevo: new FormControl('')
  });

  CerrarSession_click() {
    try {

      let result = this.authService.Logout();
      result.then((res) => {
        this.router.navigate(['home']);
      })
        .catch((err) => {
          let mensaje: string = MensajesFirebase.ObtenerMensajeErrorFB(err.code, err.message);

          alert(mensaje); //TODO: Cambiar a Popup con diseño.
        })

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }//FIN: METODO

  CambiarNombre_click(content: any) {
    try {
      this.modalService.open(content, { windowClass: 'ventanaModal', centered: true, ariaLabelledBy: 'modal-basic-title' }).result
        .then((result) => {
          //Close

          //cambia al formulario inicial despues de medio segundo.
          //esto para que no se vea el efecto de cambio al formulario original, al momento de cerrar la ventana.
          setTimeout(() => {
            this.registroExitoso = false;
            this.nuevoNombreTrim = "";
          }, 500);
        },
          (reason) => {
            //Dismiss
          });

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }//FIN: METODO

  frmRegistro_event() {
    try {
      this.lblError = "";
      this.estaCargando = true;

      //Obtener las variables directamtne del Form.
      const { nombreActual, nombreNuevo } = this.frmRegistro.value;

      //Se hace un trim al texto para evitar espacios vacios
      this.nuevoNombreTrim = Utilities.TrimTexto(nombreNuevo);

      if (this.nuevoNombreTrim == "") {
        this.lblError = "Se debe ingresar el nuevo nombre";
      } else if(this.nuevoNombreTrim.length > 20){
        this.lblError = "El nombre no puede ser mayor a 20 caracteres";
      }else {
        let result = this.authService.CambiarNombre(this.nuevoNombreTrim);

        result.then((res) => {
          // this.lblError = "Se ha cambiado correctamente el nombre";
          this.registroExitoso = true;
          this.frmRegistro.reset();
          this.CargarNombreUsuario();
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
  }//FIN: METODO

  txt_changed(): void {
    this.lblError = "";
  }

}
