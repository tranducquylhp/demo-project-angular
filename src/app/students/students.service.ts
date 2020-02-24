import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../shared/httpclientprovider/http-client-provider";
import {Observable} from "rxjs/Observable";
import {Student} from "./model/student";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class StudentsService {
    API_STUDENTS_URL = "http://localhost:8080/students/";

    constructor(private http: HttpClient) {
    }

    getAllStudents(): Observable<Student[]> {
        return this.http.get<Student[]>('http://localhost:8080/students/');
    }

    createStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(this.API_STUDENTS_URL, student);
    }

    editStudent(student: Student): Observable<Student> {
        return this.http.put<Student>(this.API_STUDENTS_URL, student);
    }

    deleteStudent(student_id: string): Observable<void> {
        return this.http.delete<void>(this.API_STUDENTS_URL + student_id);
    }

    findStudentById(student_id: string): Observable<Student> {
        return this.http.get<Student>(this.API_STUDENTS_URL + student_id);
    }
}
