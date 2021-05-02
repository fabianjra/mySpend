import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FontawesomeService } from 'src/app/services/fontawesome.service';
import { MensajesFirebase } from 'src/app/shared/mensajesfirebase';
import { Utilities } from 'src/app/shared/utilities';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {

  constructor(private router: Router, public fontAwesome: FontawesomeService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  CerrarSession_click() {
    try {

      let result = this.authService.Logout();
      result.then((res) => {
        this.router.navigate(['home']);
      })
        .catch((err) => {
          let mensaje: string = MensajesFirebase.ObtenerMensajeErrorFB(err.code, err.message);

          alert(mensaje); //F: Cambiar a Popup con diseño.
        })

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }//FIN: METODO

  CambiarNombre_click()
  {
    try {
      this.router.navigate(['cambiarNombre']);
    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }//FIN: METODO

}
