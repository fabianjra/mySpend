import { Component, OnInit } from '@angular/core';
import { Utilities } from 'src/app/shared/utilities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  async AgregarItem_click(content: any) {
    try {
      await this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result
        .then((result) => {

        });

    } catch (error) {
      Utilities.LogErrorThrow((new Error).stack, error);
    }
    finally {

    }
  }

}//FIN: Clase
