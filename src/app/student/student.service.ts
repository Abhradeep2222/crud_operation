import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student-interface';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class StudentService {

  studentList:any = JSON.parse(localStorage.getItem('studentList')as any)
  // studentList:any=localStorage.getItem('studentList');

  student!: Student;

  constructor(private http: HttpClient) {
  }
  getStudents(){
    return this.studentList = JSON.parse(localStorage.getItem('studentList')as any);
  }
  getStudent(id: string){
    // let student: Student;
    this.studentList.map((val:any)=>{
      if(val.id == id) this.student = val;
    });
    return this.student;
  }
  studentEdit(student: Student){
    let present: Boolean = false;
    this.studentList.map((val:any, index:number)=>{
      if(val.id == student.id) {this.studentList[index] = student;present=true}
    });
    localStorage.setItem('studentList',JSON.stringify(this.studentList));

    return present;

  }
  
  deleteEmployee(id: number){
     this.studentList = this.studentList.filter((s:any)=>s.id != id );
     localStorage.setItem('studentList',JSON.stringify(this.studentList));
    
    // return this.http.delete(`${this.studentList}/${id}`);
  }
  // deleteStudent(id: number): void {
  //   this.student = this.student.filter((student) => student.id !== id);
  // }

}

