import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Return-order-management';
  isLoggedIn=false;
  constructor(private route: Router,private authService:LoginService) {

  }
  ngOnInit(): void{
    this.authService.isLoggedIn.subscribe((isLoggedIn)=>{
      if(!!isLoggedIn){
      this.isLoggedIn = true;
      }
      else{
        this.isLoggedIn = false;
      }
    })

  }
  loginPage(){

    //this.isLoggedIn=true;
    this.route.navigateByUrl('/login');

  }
  logout(){
      this.isLoggedIn=false;
      localStorage.removeItem('id_token');
      localStorage.removeItem('id');
      this.route.navigateByUrl('/login');
  }
}

