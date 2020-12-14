import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/model/login.model';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  jsonData: Login = new Login;
  username: any;
  password: any;
  error: any;


  constructor(private loginService: LoginService,
    private router: Router,
    private alertService: AlertService) {
    this.loginService.loginService().subscribe(
      (returnVal: any) => {
        this.jsonData = returnVal;
      })
  }

  ngOnInit(): void {
  }

  login() {
    this.error = null;
    if (!this.username || !this.password) {
      this.error = "Please check username and password.";
      this.alertService.error(this.error);
      return;
    }

    if (this.username == this.jsonData.username && this.password == this.jsonData.password) {
      this.router.navigate(['/employee/employee-list']);
      this.alertService.success("Login successfully");
    }
    else {
      this.error = "Wrong password or username.";
      this.alertService.error(this.error);
    }
  }

}
