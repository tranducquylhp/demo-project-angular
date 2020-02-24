import { Component, OnInit } from '@angular/core';
import {StudentsService} from "../students.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {Student} from "../model/student";

@Component({
  selector: 'app-students-edit',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.css']
})
export class StudentsEditComponent implements OnInit {
  sub: Subscription;
  studentForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    schoolName: new FormControl(''),
    birthday: new FormControl('')
  });
  student: Student;
  constructor(private studentsService: StudentsService,
              private activateRoute: ActivatedRoute,
              private fb: FormBuilder,
              private  router: Router) { }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.studentsService.findStudentById(id).subscribe(next => {
        this.student = next;
      }, error1 => {
        console.log(error1);
      });
    });
  }

  update() {
    if (this.studentForm.value.name !== '') {
      this.student.name = this.studentForm.value.name;
    };
    if (this.studentForm.value.birthday !== '') {
      this.student.birthday = this.studentForm.value.birthday;
    };
    if (this.studentForm.value.schoolName !== '') {
      this.student.schoolName = this.studentForm.value.schoolName;
    };

    this.studentsService.editStudent(this.student).subscribe( next => {
      console.log(next);
      alert('Update thành công');
      this.router.navigate(['student/list']);
    }, error1 => {
      console.log(error1);
    })
  }
}
