import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menu: any;

  constructor( private router: Router, private loginser: LoginService ) { }

  ngOnInit() {
    this.menu = this.loginser.menu;
  }

  salir() {
    this.router.navigate(['login']);
    this.loginser.logout();
  }

  verSidebar() {
    $('#wrapper').toggleClass('toggled');
  }

}
