import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: any;

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('TOKEN_USER');

    debugger;
    if (this.token == "" || this.token == null) {
      this.router.navigate(['/login']);
    }
 

  }

}
