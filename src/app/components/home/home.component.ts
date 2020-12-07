import { CookieService } from 'ngx-cookie-service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router, private _cookieService: CookieService) { }

  ngOnInit(): void {

    const token = this._cookieService.get('TOKEN_USER');

    if ( token === null || token === undefined || token === "") {

      this._router.navigate(['/']);
    }
  }

}
