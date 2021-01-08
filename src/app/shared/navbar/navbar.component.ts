import { Component, OnInit } from '@angular/core';
import { Utilities } from "src/app/shared/utilities";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  toggleClass: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  btnNavbar_click() {
    try {
      this.toggleClass = !this.toggleClass;

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

}
