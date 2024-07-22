import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  // styles: [ `a{text-decoration:none;color: black;display:block;padding:15px;}ul{padding:0;}li{list-style:none;}.w-50{display:inline-block;width:45%;cursor:pointer}li:hover{background:#eee}.text-right{text-align: right;}.text-center{text-align: center;}` ]
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit  {

  studentList!: Student[];
  product = [];
  products: any;
  student:any;
  itemId!: number;
  
  constructor(private studentService: StudentService,private router: Router){}

    ngOnInit(){
      this.studentList = this.studentService.getStudents();
      // this.product = this.product;
    }

    viewHostname(){
      this.router.navigate(['/student',this.student.id]);
    }

    editHostname(){
      this.router.navigate(['/student-add',this.student.id,'edit']);
    }

    
    //  deleteItem(itemId: number) {
    //   const index = this.student.id.findIndex((item: { id: number; }) => item.id === itemId);
    
    //   if (index!== -1) {
    //     this.student.id.splice(index, 1);
    //   }
    // }
    
    
    deleteEmployee(id: any){
      this.studentService.deleteEmployee(id);
      this.studentList = this.studentService.getStudents();

    }
}
