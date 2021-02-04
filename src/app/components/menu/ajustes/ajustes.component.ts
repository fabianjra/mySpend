import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontawesomeService } from 'src/app/services/fontawesome.service';
import { Utilities } from 'src/app/shared/utilities';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {

  constructor(private router: Router, public fontAwesome:FontawesomeService) { }

  ngOnInit(): void {
  }

  CerrarSession_click() {
    try {
      this.router.navigate(['home']);
    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
  }

}
