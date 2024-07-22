import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { StudentService } from './student.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { Student } from './student-interface';


@Component({
  selector: 'student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
  // styles: [ `input{width:100%;padding: 10px 15px;margin:5px auto;}` ]
})
export class StudentAddComponent implements OnInit  {

  studentForm!: FormGroup;
  employeeForm!: FormGroup;
  isEdit: Boolean = false;
  msg:String = '';
  saveAsStudentList :any[]=[];
  student: any;
  
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ){

  }
  
  ngOnInit(){
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      id: ['',Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: [null, [Validators.required, Validators.pattern("[0-9 ]{10}")]]
    })
      this.route.params.subscribe(param => {
        console.log(param)
        if(param && param['id']){
          let student = this.studentService.getStudent(param['id']);
          if(student){
            this.studentForm.setValue(student);
            this.isEdit = true;
            }
          else this.router.navigate(['/students'])
        }
      })
  }

  resetForm(){
    console.log('reset',this.studentForm)
    this.studentForm.reset();
  }

  add(){
    if(this.studentForm.valid){
      this.saveAsStudentList=JSON.parse(localStorage.getItem('studentList')as any);
      this.saveAsStudentList.push(this.studentForm.value);
      localStorage.setItem('studentList',JSON.stringify(this.saveAsStudentList));
      this.resetForm();
      console.log('this.studentService.studelost',this.studentService.getStudents())}
      else {
      this.msg = 'Please complete form'
    }
  }

  edit(){
    this.msg = '';
    if(this.studentForm.valid){
      if(this.studentService.studentEdit(this.studentForm.value)){
        this.router.navigate(['/students'])
      }else {
        this.msg = 'Something went wrong'
      }
    }else {
      this.msg = 'Please complete form'
    }
  }

  goBack() {
    if(this.isEdit){
    this.router.navigate(['/students']);
    }
  }
  
}
