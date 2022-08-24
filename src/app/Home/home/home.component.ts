import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public headers:any;
  public datas:any;
  public user = false;
  public step1 = false;
  public step1Form: FormGroup = new FormGroup({});
  public step2Form: FormGroup = new FormGroup({});
  public readonly = true;
  public submitted = false;
  public status!: String;
  constructor(
 
    private route: Router,
    private fb: FormBuilder,
    private homeService: HomeService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    console.log(history.state.isLoggedIn, 'history');
    this.user = history.state.isLoggedIn
    if (this.user){
      this.step1 = true;
      
    }
    this.step1Form = this.fb.group({
      name: ['', Validators.required],
      contactNumber: ['', [Validators.required,Validators.minLength(10)]],
      componentName: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      componentType: ['', Validators.required],
    })
    this.step2Form = this.fb.group({
      requestId: ['', Validators.required],
      totalCharges: ['', Validators.required],
      status: ['', Validators.required],
      packageCharges: ['', Validators.required],
      deliveryCharges: ['', Validators.required],
      dateOfDelivery: ['', Validators.required]
  })

  }
  sawdeatils(){
 
   
   console.log( this.homeService.sawdetails().subscribe(res => {
      if (res) {
      
      }
    }))
  }
  proceedToNext(){
    this.submitted = true;
    if(this.step1Form.invalid){
      return
    }
    console.log(this.step1Form.value, 'step1')
    this.homeService.sendOrderDetails(this.step1Form.value).subscribe((res) => {
      if(res){
        this.status = res.status;
        Object.entries(res).map(item => {
          this.step2Form.controls[item[0]].setValue(item[1])
        })
        this.step2Form.controls['dateOfDelivery'].setValue(this.datePipe.transform(Date.now(),'yyyy-MM-dd'))
      }
    })
   
    this.step1 = false;
    this.step1Form.reset();
    this.submitted = false;
  }

  get f(){
    return this.step1Form.controls;
  }

  save() {
    const status = { status: this.step2Form.controls['status'].value }
    
    this.homeService.updateStatus(status,this.step2Form.controls['requestId'].value).subscribe((res) => {
      if (status.status === 'Fulfill') {
        alert("Response Updated Successfully");
        this.route.navigate(['/view'],{
          state:{
            requestId:this.step2Form.controls['requestId'].value
          }
        })
      } else {
        alert("We are not processing your request,Thankyou for your response");
        this.step1 = true;
        this.submitted = false;
      }
    })
  }

  close(){
    this.step1 = true;
  }
  
}
