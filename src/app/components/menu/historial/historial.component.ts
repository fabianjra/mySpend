import { Component, OnInit } from '@angular/core';
import { FontawesomeService } from 'src/app/services/fontawesome.service';
import { Utilities } from 'src/app/shared/utilities';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  public lblMes: string;
  public dateTimeDinamic: Date;

  constructor(public fontAwesome: FontawesomeService) {
    this.lblMes = "";

    let dateObj = new Date(); //Wed Feb 17 2021 20:28:40 GMT-0600 (hora estándar central)
    var month = dateObj.getMonth(); //months from 0-11 -> Se debe recorrer en array de FOR, por eso no se le suma 1.

    this.dateTimeDinamic = dateObj;
    this.lblMes = Utilities.ObtenerNombreMes(month);
  }

  ngOnInit(): void {
  }

  async MesAnterior_click() {
    try {
      let fechaNueva: Date = Utilities.RestaMesFecha(this.dateTimeDinamic, -1);
      this.lblMes = Utilities.ObtenerNombreMes(fechaNueva.getMonth());

      //Actualiza la fecha dinamica:
      this.dateTimeDinamic = fechaNueva;
      
    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
    finally {

    }
  }

  async MesActual_click() {
    try {
      let fechaNueva: Date = new Date();
      this.lblMes = Utilities.ObtenerNombreMes(fechaNueva.getMonth());

      //Actualiza la fecha dinamica:
      this.dateTimeDinamic = fechaNueva;

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
    finally {

    }
  }

  async MesSiguiente_click() {
    try {
      let fechaNueva: Date = Utilities.SumaMesFecha(this.dateTimeDinamic, 1);
      this.lblMes = Utilities.ObtenerNombreMes(fechaNueva.getMonth());

      //Actualiza la fecha dinamica:
      this.dateTimeDinamic = fechaNueva;

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
    finally {

    }
  }

}//FIN: Clase
