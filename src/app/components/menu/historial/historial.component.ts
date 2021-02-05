import { Component, OnInit } from '@angular/core';
import { FontawesomeService } from 'src/app/services/fontawesome.service';
import { Utilities } from 'src/app/shared/utilities';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(public fontAwesome:FontawesomeService) { }

  ngOnInit(): void {
  }

}
