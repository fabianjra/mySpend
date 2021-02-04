import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from "@angular/forms"; //Para el formulario de registro.
import { Utilities } from 'src/app/shared/utilities';
import { NavbarService } from 'src/app/services/navbar.service';
import { Location } from '@angular/common'; //Para volver atras
import { AuthService } from 'src/app/services/auth.service';
import { FontawesomeService } from 'src/app/services/fontawesome.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //Variables del formulario. Los nombres de las variables, deben coincidir con los atributos "formControlName"
  //de cada input en el HTML.
  frmRegistro = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
  });

  public lblError: string;

  constructor(
    private router: Router,
    private nav: NavbarService,
    private location: Location,
    private authService: AuthService,
    public fontAwesome:FontawesomeService) {

    this.lblError = "";
  }

  VolverAtras_click() {
    this.location.back();
  }

  frmRegistro_event() {
    try {

      //Obtener las variables directamtne del Form.
      const { nombre, apellido, email, password, passwordConfirm } = this.frmRegistro.value;

      this.lblError = "";

      if (nombre == "" || email == "" || password == "" || passwordConfirm == "")
      {
        this.lblError = "Se deben ingresar los datos";
      }
      else if(String(password).length < 6)
      {
        this.lblError = "La contraseña debe tener al menos 6 caracteres";
      }
      else
      {
        if (password != passwordConfirm)
        {
          this.lblError = "La contraseña y la confirmación no coinciden";
        }
        else
        {
          this.authService.Registrar(email, passwordConfirm);

          this.lblError = "registro en construcción. Se ha creado el usuario y puede ser utilizado para loguearse";
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
