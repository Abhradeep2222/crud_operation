import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student-interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'student-view',
  templateUrl: './student-view.component.html',
  styleUrls: [ './student-view.component.scss' ]
})
export class StudentViewComponent implements OnInit  {

  student!: Student;
  students:any;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ){}

    ngOnInit(){
      this.route.params.subscribe(param => {
        console.log(param)
        if(param){
          this.student = this.studentService.getStudent(param['id']);
        }
      })
      
    }

    viewHostname(){
      this.router.navigate(['/students']);
    }
}
