import { FontawesomeService } from 'src/app/services/fontawesome.service';
import { MensajesFirebase } from 'src/app/shared/mensajesfirebase';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from "@angular/forms"; //Para el formulario de registro.
import { Utilities } from 'src/app/shared/utilities';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; //Para volver atras

@Component({
  selector: 'app-cambiar-nombre',
  templateUrl: './cambiar-nombre.component.html',
  styleUrls: ['./cambiar-nombre.component.css']
})
export class CambiarNombreComponent implements OnInit {

  public lblError: string;
  public estaCargando: boolean;
  public nombreActual: any;

  constructor(private location: Location, public fontAwesome: FontawesomeService, private authService: AuthService,) {
    this.lblError = "";
    this.estaCargando = false;
    this.nombreActual = "";
    this.frmRegistro.controls['nombreActual'].disable();
  }

  ngOnInit(): void {
    try {
      //Carga el nombre del usuario actual
      let result = this.authService.getCurrentUser();

      result.then((res) => {
        this.nombreActual = res?.displayName;
      })
      .catch((err) => {
        let mensaje: string = MensajesFirebase.ObtenerMensajeErrorFB(err.code, err.message);
        this.lblError = mensaje;
      })
    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

  //Variables del formulario. Los nombres de las variables, deben coincidir con los atributos "formControlName"
  //de cada input en el HTML.
  frmRegistro = new FormGroup({
    nombreActual: new FormControl(''),
    nombreNuevo: new FormControl('')
  });

  async frmRegistro_event() {
    try {
      this.lblError = "";
      this.estaCargando = true;

      //Obtener las variables directamtne del Form.
      const { nombreActual, nombreNuevo } = this.frmRegistro.value;

      if (nombreNuevo == "") {
        this.lblError = "Se deben ingresar el nombre nuevo";
      } else {
        let result = this.authService.CambiarNombre(nombreNuevo);

        await result.then((res) => {
          this.lblError = "Se ha cambiado correctamente el nombre";
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

  Atras_click(): void {
    this.location.back();
  }

}
