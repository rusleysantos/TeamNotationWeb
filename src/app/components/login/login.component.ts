import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/models/login';
import { MessageReturn } from 'src/app/models/message-return';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageReturn: any;
  showMessage = false;
  showLogin = true;

  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  constructor(private loginService: LoginService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(): void {

    const login = new Login;
    login.Username = this.loginForm.value.username;
    login.Password = this.loginForm.value.password;

    this.loginService.LoginUser(login).subscribe((tokenReturn: MessageReturn) => {

      this.messageReturn = tokenReturn;

      if (this.messageReturn.status) {
        this.cookieService.set('TOKEN_USER', this.messageReturn.description);
        this.showMessage = false;

        this.router.navigate(['/home']);
      }
      else {
        this.showMessage = true;
      }
    });
  }

}