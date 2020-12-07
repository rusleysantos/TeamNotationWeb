import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  token: any;

  constructor(private _cookieService: CookieService, private _router: Router) { }

  ngOnInit(): void {

    const token = this._cookieService.get('TOKEN_USER');

    if ( token === null || token === undefined || token === "") {

      this._router.navigate(['/']);
    }

  }

  logout(): void{

    this._cookieService.delete('PROJECT_SELECT', '/');
    this._cookieService.delete('TOKEN_USER','/');
    this._router.navigate(['/']);

  }

}
