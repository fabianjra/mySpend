import { FontawesomeService } from 'src/app/services/fontawesome.service';
import { MensajesFirebase } from 'src/app/shared/mensajesfirebase';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from "@angular/forms"; //Para el formulario de registro.
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utilities } from 'src/app/shared/utilities';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {

  //Iniciar controles generales.
  public estaCargando: boolean;
  public registroExitoso: boolean;

  //Iniciar controles Form Cambiar Nombre.
  public txtNombreActual: FormControl;
  public txtNombreNuevo: FormControl;
  public lblErrorNombreCambiar?: string;
  public frmRegistroCambiarNombre = new FormGroup({
    nombreActual: new FormControl(''),
    nombreNuevo: new FormControl('')
  });

  //Iniciar controles Form Cambiar Password.
  public txtPasswordActual: FormControl;
  public txtPasswordNueva: FormControl;
  public txtPasswordConfirmar: FormControl;
  public lblErrorPasswordCambiar?: string;
  public frmRegistroCambiarPassword = new FormGroup({
    passwordActual: new FormControl(''),
    passwordNueva: new FormControl(''),
    passwordConfirmar: new FormControl('')
  });

  //Iniciar controles Form Verificar Usuario
  public txtEmailVerificarUsuario: FormControl;
  public lblErrorVerificarUsuario?: string;
  public frmVerificarUsuario = new FormGroup({
    emailVerificarUsuario: new FormControl('')
  })

  constructor(private router: Router,
    public fontAwesome: FontawesomeService,
    private authService: AuthService,
    private modalService: NgbModal) {

    //Controles generales.
    this.estaCargando = false;
    this.registroExitoso = false;

    //Para el Form Cambiar Nombre
    this.lblErrorNombreCambiar = "";
    this.txtNombreActual = this.frmRegistroCambiarNombre.controls['nombreActual'] as FormControl;
    this.txtNombreNuevo = this.frmRegistroCambiarNombre.controls['nombreNuevo'] as FormControl;
    // this.frmRegistroCambiarNombre.controls['nombreActual'].disable();

    //Para el Form Cambiar Password:
    this.lblErrorPasswordCambiar = "";
    this.txtPasswordActual = this.frmRegistroCambiarPassword.controls['passwordActual'] as FormControl;
    this.txtPasswordNueva = this.frmRegistroCambiarPassword.controls['passwordNueva'] as FormControl;
    this.txtPasswordConfirmar = this.frmRegistroCambiarPassword.controls['passwordConfirmar'] as FormControl;

    //Para el Form VerificarUsuario:
    this.lblErrorVerificarUsuario = "";
    this.txtEmailVerificarUsuario = this.frmVerificarUsuario.controls['emailVerificarUsuario'] as FormControl;
  }

  /****************************************************************************************/
  /*                                    GENERALES                                        
  /****************************************************************************************/

  ngOnInit(): void {
    try {
      //Anteriormente se cargaba aqui el nombre de usuario.
      //Ahora se carga tomando el FormControl y asignandole el texto, desde el boton de cambiar nombre.
    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

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

  /****************************************************************************************/
  /*                                 CAMBIAR NOMBRE                                       */
  /****************************************************************************************/

  //Función para cambiar el nombre
  CargarNombreUsuario(): void {
    //Carga el nombre del usuario actual
    let result = this.authService.getCurrentUser();

    result.then((res) => {
      this.txtNombreActual.setValue(res?.displayName);

    })
      .catch((err) => {
        let mensaje: string = MensajesFirebase.ObtenerMensajeErrorFB(err.code, err.message);
        this.lblErrorNombreCambiar = mensaje;
      })
  }

  //Evento al presionar click sobre opcion de cambiar nombre, en el menu de ajustes
  CambiarNombre_click(contenidoFormCambiarNombre: any) {
    try {

      //Carga el nombre del usuario.
      this.CargarNombreUsuario();

      this.modalService.open(contenidoFormCambiarNombre, { windowClass: 'ventanaModal', centered: true, ariaLabelledBy: 'modal-basic-title' }).result
        .then((result) => {
          //Close

          //cambia al formulario inicial despues de medio segundo.
          //esto para que no se vea el efecto de cambio al formulario original, al momento de cerrar la ventana.
          setTimeout(() => {
            this.registroExitoso = false;

            //Resetea el formulario hasta que se cierre la ventana modal, porque si no,
            //no va a parecer el nuevo nombre en la ventana de confirmacion: "su nuevo nombre es..."
            this.frmRegistroCambiarNombre.reset();

          }, 500);
        },
          (reason) => {
            //Dismiss
            this.txtNombreNuevo.setValue("");
          });

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }//FIN: METODO

  //Evento que se llama al presionar el boton de aceptar para cambiar nombre.
  frmCambiarNombre_event() {
    try {
      this.lblErrorNombreCambiar = "";
      this.estaCargando = true;

      //Se hace un trim al texto para evitar espacios vacios
      //Obtener las variables directamtne del Form.
      let nombreNuevo = Utilities.TrimTexto(this.txtNombreNuevo.value);
      this.txtNombreNuevo.setValue(nombreNuevo);

      if (nombreNuevo == "") {
        this.lblErrorNombreCambiar = "Se debe ingresar el nuevo nombre";
      } else if (nombreNuevo.length > 20) {
        this.lblErrorNombreCambiar = "El nombre no puede ser mayor a 20 caracteres";
      } else {
        let result = this.authService.CambiarNombre(nombreNuevo);

        result.then((res) => {
          //Se ha cambiado correctamente el nombre.
          this.registroExitoso = true;
        })
          .catch((err) => {
            //Error al cambiar el nombre
            let mensaje: string = MensajesFirebase.ObtenerMensajeErrorFB(err.code, err.message);
            this.lblErrorNombreCambiar = mensaje;
          })
      }

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
    finally {
      this.estaCargando = false;
    }
  }//FIN: METODO

  txtNombreNuevo_changed(): void {
    this.lblErrorNombreCambiar = "";
  }

  /****************************************************************************************/
  /*                                 CAMBIAR PASSWORD                                     */
  /****************************************************************************************/

  CambiarPassword_click(contenidoFormCambiarPassword: any) {
    try {
      this.modalService.open(contenidoFormCambiarPassword, { windowClass: 'ventanaModal', centered: true, ariaLabelledBy: 'modal-basic-title' }).result
        .then((result) => {
          //Close

          //cambia al formulario inicial despues de medio segundo.
          //esto para que no se vea el efecto de cambio al formulario original, al momento de cerrar la ventana.
          setTimeout(() => {
            this.registroExitoso = false;

            //Resetea el formulario hasta que se cierre la ventana modal.
            this.frmRegistroCambiarPassword.reset();
          }, 500);
        },
          (reason) => {
            //Dismiss
            this.frmRegistroCambiarPassword.reset();
          });

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }//FIN: METODO

  async frmCambiarPassword_event() {
    try {
      this.lblErrorPasswordCambiar = "";
      this.estaCargando = true;

      if (Utilities.StringConContenido(this.txtPasswordActual.value) == false) {
        this.lblErrorPasswordCambiar = "Se debe ingresar la contraseña actual";
        return; //Finaliza el metodo.

      } else if (this.txtPasswordNueva.value != this.txtPasswordConfirmar.value) {
        this.lblErrorPasswordCambiar = "La contraseña nueva y la de confirmación no coinciden";
        return; //Finaliza el metodo.

      } else {
        //Valida las contraseñas digitadas, para que cumplan con el estandar.
        let grupoPasswords: Array<string> = [];
        grupoPasswords.push(this.txtPasswordNueva.value);
        grupoPasswords.push(this.txtPasswordConfirmar.value);

        let resValidarPasswords = Utilities.ValidarGrupoPasswords(grupoPasswords);

        //Si las contraseñas no tienen el formato estandar minimo, no se permite continuar.
        if (resValidarPasswords.CodigoRespuesta != 0) {
          this.lblErrorPasswordCambiar = resValidarPasswords.MensajeRespuesta;
          return;

        } else {
          //Si las contraseñas digitadas son correctas, se procede a validar si el usuario está verificado.
          await this.authService.EsUsuarioVerificado()
            .then((resUsuarioVerificado) => {

              //Si hay error al validar si el usuario es verificado, se muestra en pantalla.
              if (resUsuarioVerificado.CodigoRespuesta != 0) {
                this.lblErrorPasswordCambiar = resUsuarioVerificado.MensajeRespuesta;
                return;

              } else {
                //Si el usuario no está verificado, se indica en pantalla que se debe verificar primero.
                if (resUsuarioVerificado.EsVerificado == false) {
                  this.lblErrorPasswordCambiar = resUsuarioVerificado.MensajeRespuesta;
                  return;

                } else {
                  //El usuario está verificado.
                  //TODO: validar contraseña actual.
                  //TODO: Procesar el cambio de password.
                  console.log("usuario verificado");
                }

              }
            });

        }
      }




      //TODO: Quitar Alert.
      alert("Funcionalidad en construccion");
      // this.registroExitoso = true;

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
    finally {
      this.estaCargando = false;
    }
  }

  txtPasswordCambiar_changed(): void {
    this.lblErrorPasswordCambiar = "";
  }

  /****************************************************************************************/
  /*                                 VERIFICAR USUARIO                                    
  /****************************************************************************************/

  //Evento al presionar click sobre opcion de verificar email, en el menu de ajustes
  VerificarUsuario_click(contenidoFormVerificarUsuario: any) {
    try {

      //TODO: Validar si la cuenta esta verificada, para mostrar el PopUp de mensaje de cuenta validada.

      this.modalService.open(contenidoFormVerificarUsuario, { windowClass: 'ventanaModal', centered: true, ariaLabelledBy: 'modal-basic-title' }).result
        .then((result) => {
          //Close

          //cambia al formulario inicial despues de medio segundo.
          //esto para que no se vea el efecto de cambio al formulario original, al momento de cerrar la ventana.
          setTimeout(() => {
            this.registroExitoso = false;

            //Resetea el formulario hasta que se cierre la ventana modal.
            this.frmVerificarUsuario.reset();
          }, 500);
        },
          (reason) => {
            //Dismiss
            this.frmVerificarUsuario.reset();
          });

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

  //Evento que se llama al presionar el boton de aceptar para verificar usuario.
  async frmVerificarUsuario_event() {
    try {
      this.lblErrorVerificarUsuario = "";
      this.estaCargando = true;

      if (Utilities.StringConContenido(this.txtEmailVerificarUsuario.value) == false) {
        this.lblErrorVerificarUsuario = "Se debe ingresar el correo electrónico";
        return; //Finaliza el metodo.

      } else {
        //TODO: Validar el formato de Email.

        await this.authService.EnviarVerificacionUsuario()
          .then((res) => {

            if (res.CodigoRespuesta != 0) {
              this.lblErrorVerificarUsuario = res.MensajeRespuesta;

            } else {
              this.registroExitoso = true;
            }

          })
          .catch((err) => {
            this.lblErrorVerificarUsuario = err;
          });

      }
    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
    finally {
      this.estaCargando = false;
    }
  }

  txtVerificarUsuario_changed(): void {
    this.lblErrorVerificarUsuario = "";
  }

}
