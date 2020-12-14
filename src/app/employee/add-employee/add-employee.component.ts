import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  submitted: boolean = false;
  maxDate = new Date();

  employeeForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    birthDate: ['', [Validators.required]],
    basicSalary: ['', Validators.required],
    status: ['', Validators.required],
    group: ['', Validators.required],
    description: ['', Validators.required]
  });

  statusList = [
    { key: "Active", value: "Active" },
    { key: "Not Active", value: "Not Active" }
  ]

  groupList = [
    { key: "Sales Department", value: "Sales Department" },
    { key: "IT Department", value: "IT Department" },
    { key: "Marketing Department", value: "Marketing Department" },
    { key: "Server Department", value: "Server Department" },
    { key: "Performance Department", value: "Performance Department" },
    { key: "Manager Department", value: "Manager Department" },
    { key: "Intership Department", value: "Intership Department" },
    { key: "Staff Department", value: "Staff Department" },
    { key: "Executive Department", value: "Executive Department" },
    { key: "Fashion Department", value: "Fashion Department" }
  ]

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService) { }

  get f() { return this.employeeForm.controls; }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    if (this.employeeForm.invalid) {
      return;
    }

    let emp = new Employee();
    emp.username = this.employeeForm.value.username;
    emp.firstName = this.employeeForm.value.firstName;
    emp.lastName = this.employeeForm.value.lastName;
    emp.email = this.employeeForm.value.email;
    emp.status = this.employeeForm.value.status;
    emp.basicSalary = this.employeeForm.value.basicSalary;
    emp.group = this.employeeForm.value.group;
    emp.birthDate = this.employeeForm.value.birthDate;
    emp.description = this.employeeForm.value.description;

    let list = JSON.parse(localStorage.getItem("employees") || '[]');
    if (list) {
      list.unshift(emp);
      localStorage.setItem('employees', JSON.stringify(list));
      this.alertService.success("Add employee successfully");
    }
    
    this.router.navigate(['/employee/employee-list']);
  }

  backToList() {
    this.router.navigate(['/employee/employee-list']);
  }
}
