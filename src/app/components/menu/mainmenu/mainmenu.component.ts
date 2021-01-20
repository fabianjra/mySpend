import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

  constructor(private nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.hide();
    console.log("Se ingresó a: pagina main menu");
  }

}
