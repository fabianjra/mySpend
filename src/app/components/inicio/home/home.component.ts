import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { MensajesFirebase } from 'src/app/shared/mensajesfirebase';
import { Utilities } from 'src/app/shared/utilities';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private nav: NavbarService, private authService: AuthService, private router: Router) {
    try {
      let result = this.authService.getCurrentUser();

      result.then((res) => {

        if (res != null) {
          this.router.navigate(['mainmenu']);
        }
      })
        .catch((err) => {
          let mensaje: string = MensajesFirebase.ObtenerMensajeErrorFB(err.code, err.message);
          alert(mensaje); //F: Cambiar a Popup con diseño.
        })

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

  ngOnInit(): void {
    this.nav.show();
  }

}
