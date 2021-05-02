import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms"; //Para el formulario de registro.
import { MensajesFirebase } from 'src/app/shared/mensajesfirebase';
import { FontawesomeService } from 'src/app/services/fontawesome.service';
import { Utilities } from 'src/app/shared/utilities';

@Component({
  selector: 'app-cambiar-nombre',
  templateUrl: './cambiar-nombre.component.html',
  styleUrls: ['./cambiar-nombre.component.css']
})
export class CambiarNombreComponent implements OnInit {

  public lblError: string;
  public estaCargando: boolean;

  constructor(public fontAwesome: FontawesomeService) { 
    this.lblError = "";
    this.estaCargando = false;
  }

  ngOnInit(): void {
  }

  //Variables del formulario. Los nombres de las variables, deben coincidir con los atributos "formControlName"
  //de cada input en el HTML.
  frmRegistro = new FormGroup({
    nombreNuevo: new FormControl('')
  });

  async frmRegistro_event() {
    try {
      this.lblError = "";
      this.estaCargando = true;

      //Obtener las variables directamtne del Form.
      const { nombreNuevo} = this.frmRegistro.value;

      if (nombreNuevo == "") {
        this.lblError = "Se deben ingresar los datos";
      } else {
        // let result = this.authService.Registrar(email, passwordConfirm);

        // await result.then((res) => {

          
        // })
        //   .catch((err) => {

        //     let mensaje: string = MensajesFirebase.ObtenerMensajeErrorFB(err.code, err.message);
        //     this.lblError = mensaje;
        //   })
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
