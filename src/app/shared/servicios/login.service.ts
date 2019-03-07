import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  menu: any = [
    {
      titulo: 'Mi Banquito',
      icono: 'fas fa-piggy-bank fa-3x',
      submenu: [
        { titulo: 'Comercial', url: '/comercial', icono: 'fas fa-money-check-alt' },
        { titulo: 'ventas', url: '/ventas' },
        { titulo: 'Compras', url: '/compras' },
        { titulo: 'Almacen', url: '/almacen' }
      ]
    }
  ];

  constructor(private authServis: AngularFireAuth) { }

  login(email: string, pwd: string) {
    return new Promise((resolve, reject) => {
      this.authServis.auth.signInWithEmailAndPassword(email, pwd).then(
        datos => {
          resolve(datos);

          this.authServis.auth.currentUser.getIdToken().then(
            token => {
              console.log('token new:', token);
            });
        },
        error => reject(error)
      );
    });
  }

  getAuth() {
    return this.authServis.authState.pipe(map(auth => auth));
  }

  logout() {
    this.authServis.auth.signOut();
  }

  registrarse(email: string, pwd: string) {
    return new Promise((resolve, reject) => {
      this.authServis.auth.createUserWithEmailAndPassword(email, pwd)
        .then(datos => {
          resolve(datos), err => reject(err);
        });
    });
  }
}
