import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  params: any;
  employee: Employee = new Employee();
  ngOnInit(): void {
    let queryString = this.route.snapshot.params;
    this.params = queryString.id;

    let list = JSON.parse(localStorage.getItem('employees') || '[]');
    this.employee = list[this.params];
  }

  goToList() {
    this.router.navigate(['/employee/employee-list']);
  }

}
