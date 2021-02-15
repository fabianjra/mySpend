import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Utilities } from './shared/utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Called first time before the ngOnInit()
  constructor(private router: Router, private authService: AuthService) {
    try {
      let result = this.authService.getCurrentUser();

      result.then((res) => {

        if (res != null) {
          this.router.navigate(['mainmenu']);
        }
      })
        .catch((err) => {
          let mensaje: string = Utilities.ObtenerMensajeErrorFB(err.code, err.message);
          alert(mensaje); //F: Cambiar a Popup con diseño.
        })

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

}//FIN: Clase