import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-logn',
  templateUrl: './logn.component.html',
  styleUrls: ['./logn.component.css']
})
export class LognComponent implements OnInit {
  @ViewChild('loginModal', {static:false}) popup:any;
  @ViewChild('signUpModal', {static:false}) popup2:any;
  public loginForm: FormGroup = new FormGroup({});
  public signupForm: FormGroup = new FormGroup({});
  public submitted = false;
  public payload = {}
  public oldUser = true;
  public isLoggedIn = false;
  displayStyle = 'none'
  displayStyle2 = 'none'

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.displayStyle = 'block'
    this.loginForm = this.fb.group({
      username: ['',[Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]]
  })
  }
  submitForm(){
    this.submitted = true
    if(this.loginForm.invalid){
      return
    }
    this.payload = {username: this.loginForm.value.username, password: this.loginForm.value.password}
    this.loginService.login(this.payload).subscribe((res)=> {
      if(res){
        this.isLoggedIn = true
        sessionStorage.setItem("loginsuccess",'true');
        this.route.navigate(['/home'],{
          state:{
            isLoggedIn:this.isLoggedIn
          }
        })
        this.submitted =false
      }
    },(error) => {
      if (error.status === 400)
      {
        alert("Incorrect username or password");
      }
    })
  }
  submitNewForm() {
    console.log(this.signupForm,'submit')
    this.submitted = true
    if(this.signupForm.invalid){
      return
    }
    this.payload = {username: this.signupForm.value.username, password: this.signupForm.value.password}
    this.loginService.signUp(this.payload).subscribe((res)=> {
      if(res){
        this.submitted = false;
        this.oldUser = true;
      }
    }, (error) => {
      if (error.status === 400)
      {
        alert("User already exists");
      }
    })
  }
  createAccount() {
    this.oldUser = false;
    this.loginForm.reset()
    this.displayStyle = 'none';
    this.displayStyle2 = 'block';
    this.signupForm = this.fb.group({
      username: ['',[Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['',Validators.required]
      }, {validator: this.confirmPassword})
      console.log(this.signupForm.value, 'form')
  }

  confirmPassword(c:any): any{
    if(!c.controls.confirmPassword || !c.controls.password){
      return null;
    }
    if(c.controls.confirmPassword.errors && !c.controls.confirmPassword.errors.passwordMismatch ){
      return null;
    }
    if(c.controls.confirmPassword.value !== c.controls.password.value){
      c.controls.confirmPassword.setErrors({passwordMismatch: true})
    } else{
      c.controls.confirmPassword.setErrors(null);
    }
  }

  get f(){
    if (this.oldUser) {
      return this.loginForm.controls;
    }
    return this.signupForm.controls;
  }

  close(){
    this.signupForm.reset();
    this.oldUser = true
  }
}
