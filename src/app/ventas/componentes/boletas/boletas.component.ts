import { Component, OnInit } from '@angular/core';
import { TipCambio } from '../../modelos/tip-cambio';
import { TipoServicioService } from '../../servicios/tipo-servicio.service';

@Component({
  selector: 'app-boletas',
  templateUrl: './boletas.component.html',
  styleUrls: ['./boletas.component.css']
})
export class BoletasComponent implements OnInit {

  lisClientes: TipCambio[];
  constructor(private tipoService: TipoServicioService) { }

  ngOnInit() {
    this.tipoService.getTipo().subscribe(
      res => {
        this.lisClientes = res;
        console.log('Datos de CLiente', res);
        console.log('Datos de CLiente', this.lisClientes);
      }
    );
  }

}
