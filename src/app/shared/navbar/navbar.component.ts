import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { Utilities } from "src/app/shared/utilities";
import { HostListener } from "@angular/core"; //get screen size (dynamically & in real-time).

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuExpandido: boolean = false;
  esMenuHamburguesa: boolean = false;

  constructor(public nav: NavbarService) {
    //nav se utiliza para activar o desactivar la clase .navbarActivo, en el HTML de esta clase.
    //Asi se activa o desactiva la clase dinamicamente, en dependencia a si se muestra o no el navbar.

    this.getScreenSize();
  }

  ngOnInit(): void {
  }

  //FUNCION: Activa o desactiva la clase ".colorNegro", para hacer completamente la barra de menu a la hora 
  //de expandirse en pantallas pequeñas, por el menu hamburguesa.
  btnNavbar_click() {
    try {
      this.menuExpandido = !this.menuExpandido;
    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

  //Obtiene en el tamaño de la pantalla, escuchando al evento Resize, para obtenerlo en tiempo real.
  //Validacion: aciva o desactiva la bandera de "esMenuHamburguesa", para aplicar el "data-target" al hacer click
  //en los enlaces del navbar. De no ser asi, intenta hacer un "collapse" al navbar, cuando no deberia y provoca un
  //salto en el navbar.
  //Esto es lo utilizado en el HTML como: [attr.data-target]="esMenuHamburguesa ? '#navbarSupportedContent' : '' "
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    //let altura = window.innerHeight;
    let ancho = window.innerWidth;

    //momento al pasar de barra de menu, a menu hamburguesa (991px de ancho o menos).
    if (ancho <= 991) {
      this.esMenuHamburguesa = true;
    }
    else {
      this.esMenuHamburguesa = false;
    }
  }

}//FIN: Component