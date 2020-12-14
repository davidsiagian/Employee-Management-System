import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/model/employee.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  pageIndex: number = 1;
  pageSize: number = 10;

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService) { }

  empSource = new MatTableDataSource<Employee>();
  displayEmployeeList: Observable<any> = new Observable<any>();
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.empSource.paginator = paginator;
  }

  ngOnInit(): void {
    let list = JSON.parse(localStorage.getItem('employees') || '[]');

    if (list.length > 0) {
      this.empSource.data = list;
    }
    else {
      this.employeeService.retrieveEmployeeData().subscribe(
        (returnVal: any) => {
          this.empSource.data = returnVal.Data;
          localStorage.setItem("employees", JSON.stringify(this.empSource.data));
        }
      )
    }
    this.displayEmployeeList = this.empSource.connect();
  }

  goToDetail(id: number) {
    let index = ((this.pageIndex * this.pageSize) - this.pageSize) + id;
    this.router.navigate(['/employee/employee-detail', index]);
  }

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

  goToAddEmployee() {
    this.router.navigate(['/employee/add-employee']);
  }

  logOut() {
    this.loginService.logOut();

  }

  edit() {
    this.alertService.warn("Edited employee!")
  }

  delete() {
    this.alertService.error("Deleted employee!")
  }

}
