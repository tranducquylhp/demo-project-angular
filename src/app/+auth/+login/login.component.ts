import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/+auth/auth.service';
import { LoginRequestModel } from '../model/login-request-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public username;
  public password;
  message: string;
  public model: LoginRequestModel;
  constructor(private authService: AuthService, public router: Router) {
    this.model = new LoginRequestModel();
  }

  login(event) {
    event.preventDefault();
    this.authService.login(this.model)  
      .subscribe((user) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          //this.router.navigate(this.redirectUrl ? [this.redirectUrl] : ['/home']);
          this.router.navigate(['/home']);
        }
        else{
          this.message = "Credentials are not valid!";  
        }
    });
  }

  logout() {
    this.authService.logout();
    this.message = "Logged out!";
  }
}
