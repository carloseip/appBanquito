import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipCambio } from '../modelos/tip-cambio';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {

  eClientes: TipCambio[] = [];
  clientesColeccion: AngularFirestoreCollection<TipCambio>;
  clienteDoc: AngularFirestoreDocument<TipCambio>;
  clientes: Observable<TipCambio[]>;
  cliente: Observable<TipCambio>;

  constructor(private db: AngularFirestore) {
    this.clientesColeccion = this.db.collection('tipocambio', ref => ref.orderBy('compra', 'asc'));
  }

  getTipo(): Observable<TipCambio[]> {
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as TipCambio;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.clientes;
  }
}
