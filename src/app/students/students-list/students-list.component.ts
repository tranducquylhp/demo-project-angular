import { Component, OnInit } from '@angular/core';
import {StudentsService} from "../students.service";
import {Route, Router} from "@angular/router";
import {Student} from "../model/student";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  studentList: Student[];

  constructor(private studentsService: StudentsService,
              private router: Router) { }
  ngOnInit() {
    this.studentsService.getAllStudents().subscribe( next => {
      this.studentList = next;
    }, error1 => {
      console.log('loi roi');
      console.log(error1);
    })
  }
  delete(student_id) {

    this.studentsService.findStudentById(student_id).subscribe(next => {
      for (let i=0; i<this.studentList.length; i++){
        if (this.studentList[i].id === next.id){
          this.studentList.splice(i, 1);
          break;
        };
      }
    });
    this.studentsService.deleteStudent(student_id).subscribe( () => {
      alert('Xóa thành công');
    }, error1 => {
      console.log(error1);
    });
  }

  editRouter(student_id){
    this.router.navigate(['/student/edit', student_id]);
  }
}
