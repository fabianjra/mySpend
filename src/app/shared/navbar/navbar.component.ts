import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { Utilities } from "src/app/shared/utilities";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuExpandido: boolean = false;

  constructor(public nav: NavbarService) {
    //nav se utiliza para activar o desactivar la clase .navbarActivo, en el HTML de esta clase.
    //Asi se activa o desactiva la clase dinamicamente, en dependencia a si se muestra o no el navbar.
  }

  ngOnInit(): void {
  }

  btnNavbar_click() {
    try {
      this.menuExpandido = !this.menuExpandido;

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }
}
