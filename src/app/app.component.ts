import { Component, OnInit } from '@angular/core';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import { Login } from './models/login';
import { LoginService } from './services/login.service'
import { MessageReturn } from './models/message-return'
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messageReturn: any;

  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  constructor(private loginService: LoginService, private cookieService: CookieService) { }
  ngOnInit() { }

  loginUser() {

    const login = new Login;
    login.Username = this.loginForm.value.username,
      login.Password = this.loginForm.value.password,

      this.loginService.LoginUser(login).subscribe((tokenReturn: MessageReturn) => {
        debugger;
        this.messageReturn = tokenReturn;
        
        if(this.messageReturn.status){
          this.cookieService.set('TOKEN_USER',this.messageReturn.description);
        }
      });
  }

}
