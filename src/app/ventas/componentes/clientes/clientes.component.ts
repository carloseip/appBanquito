import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import { Ecliente } from '../../modelos/ecliente';
import { async } from '@angular/core/testing';

declare var $: any;
declare var Swal: any;
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  lisClientes: Ecliente[];
  constructor( private clientesService: ClientesService) { }

  ngOnInit() {
    this.clientesService.getClientes().subscribe(
      res => {
        this.lisClientes = res;
        console.log('Datos de CLiente', res);
        console.log('Datos de CLiente', this.lisClientes);
      }
    );
  }
  async nuevo() {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Clientes',
      html:
        `<label for="txtNombre">Nombre:</label><input id="txtNombre" class="swal2-input"  placeholder="Nombre">` +
        '<label for="txtEdad">Edad:</label><input id="txtEdad" class="swal2-input"  placeholder="Edad">' +
        '<label for="txtSaldo">Saldo:</label><input id="txtSaldo" class="swal2-input" placeholder="Saldo">' +
        '<label for="txtPais">Pais:</label><input id="txtPais" class="swal2-input" placeholder="País">',
      focusConfirm: false,
      preConfirm: () => {
        // let element: HTMLElement;
        // element = document.getElementById('ButtonX') as HTMLElement;
        return [
          (<HTMLInputElement>document.getElementById('txtNombre')).value,
          (<HTMLInputElement>document.getElementById('txtEdad')).value,
          (<HTMLInputElement>document.getElementById('txtSaldo')).value,
          (<HTMLInputElement>document.getElementById('txtPais')).value
          // document.getElementById('swal-input1').value,
          // document.getElementById('swal-input2').value
        ]
      }
    });

    if (formValues) {
      //Swal.fire(JSON.stringify(formValues));

      const data = {
        nombre: formValues[0],
        edad: formValues[1],
        saldo: formValues[2],
        pais: formValues[3]
      };

      this.clientesService.grabarCliente(data);
    }
  }

  editar() {
    
  }

  eliminar() {
  }
  }


