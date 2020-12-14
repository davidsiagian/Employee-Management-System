import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {
  }

  public loginService() {
    return this.http.get<any>("./assets/json/login.json");
  }

  public logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
