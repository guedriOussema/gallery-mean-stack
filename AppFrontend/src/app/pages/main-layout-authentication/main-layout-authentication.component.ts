import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout-authentication',
  templateUrl: './main-layout-authentication.component.html',
  styleUrls: ['./main-layout-authentication.component.scss']
})
export class MainLayoutAuthenticationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    //return this.authService.isLoggedIn();
    return(false);
  }

}
