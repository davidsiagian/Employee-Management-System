import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  public retrieveEmployeeData() {
    return this.http.get<any>("./assets/json/employee.json");
  }
}
