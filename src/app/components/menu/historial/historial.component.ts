import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Historial } from 'src/app/interfaces/historial';

import { FontawesomeService } from 'src/app/services/fontawesome.service';
import { Utilities } from 'src/app/shared/utilities';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  closeResult = '';

  public listaHistorial: Historial[];

  public lblMes: string;
  public dateTimeDinamic: Date;

  constructor(public fontAwesome: FontawesomeService, private modalService: NgbModal) {
    this.lblMes = "";

    let dateObj = new Date(); //Wed Feb 17 2021 20:28:40 GMT-0600 (hora estándar central)
    var month = dateObj.getMonth(); //months from 0-11 -> Se debe recorrer en array de FOR, por eso no se le suma 1.
    let year = dateObj.getFullYear();

    this.dateTimeDinamic = dateObj;
    this.lblMes = Utilities.ObtenerNombreMes(month) +"  "+ year;

    //Carga la lista del historial del usuario.
    this.listaHistorial = [];
    //this.CargarHistorial();
  }

  ngOnInit(): void {
  }

  CargarHistorial() {

    //Consulta a firebase
    let arrayFBOriginal = JSON.stringify('{ "Historial" : [ { "IdHistorial": "01", "Categoria": "Salida", "Monto": "145000", "Fecha": "25/05/2021", "Icono": this.fontAwesome.faUtensilSpoon }, { "IdHistorial": "02", "Categoria": "Gasolina", "Monto": "25000", "Fecha": "10/05/2021", "Icono": this.fontAwesome.faGlassCheers} ] }');

    console.log(arrayFBOriginal);

    let arrayFB = JSON.parse(arrayFBOriginal);

    console.log(arrayFB);


  }


  async MesAnterior_click() {
    try {
      let fechaNueva: Date = Utilities.RestaMesFecha(this.dateTimeDinamic, -1);
      this.lblMes = Utilities.ObtenerNombreMes(fechaNueva.getMonth()) + "  " + fechaNueva.getFullYear();

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
      this.lblMes = Utilities.ObtenerNombreMes(fechaNueva.getMonth()) + "  " + fechaNueva.getFullYear();

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
      this.lblMes = Utilities.ObtenerNombreMes(fechaNueva.getMonth()) + "  " + fechaNueva.getFullYear();

      //Actualiza la fecha dinamica:
      this.dateTimeDinamic = fechaNueva;

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
    finally {

    }
  }

  async ModificarItem_click(content: any) {
    try {
      await this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result
        .then((result) => {
          this.closeResult = `Closed with: ${result}`;
        },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
    finally {

    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}//FIN: Clase
