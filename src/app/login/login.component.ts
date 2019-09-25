import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {AuthenticationService} from '../service/data/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor(
    public router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  onLoggedin() {
    localStorage.setItem('isLoggedin', 'true');
  }

  handleLogin() {
    // console.log(this.username);
    // console.log(this.password);
    if (this.authenticationService.authenticate(this.username, this.password)) {
      this.invalidLogin = false;
      localStorage.setItem('isLoggedin', 'true');
      // @ts-ignore
      this.router.navigate(['dashboard']);
    } else {
      this.invalidLogin = true;
      localStorage.setItem('isLoggedin', 'false');
    }
  }

}
