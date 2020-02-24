import { Component, OnInit } from '@angular/core';
import {StudentsService} from "../students.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../shared/user";
import {Subscription} from "rxjs/Subscription";
import {Student} from "../model/student";

@Component({
  selector: 'app-students-create',
  templateUrl: './students-create.component.html',
  styleUrls: ['./students-create.component.css']
})
export class StudentsCreateComponent implements OnInit {

  sub: Subscription;
  studentForm: FormGroup;
  constructor(private studentsService: StudentsService,
              private activateRoute: ActivatedRoute,
              private fb: FormBuilder,
              private  router: Router) { }

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: '',
      birthday: '',
      schoolName: ''
    });
  }

  create() {
    const student: Student = {
      name: this.studentForm.value.name,
      birthday: this.studentForm.value.birthday,
      schoolName: this.studentForm.value.schoolName
    };

    this.studentsService.createStudent(student).subscribe(next => {
      console.log(next);
      this.router.navigate(['student/list']);
    }, error1 => {
      console.log(error1);
    })
  }

}
