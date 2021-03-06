import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './../../services/user.service';
import { AlertService } from "./../../../shared/alert/alert.service";
import { environment } from "./../../../../environments/environment";
import { WallpaperService } from "./../../services/wallpaper.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public isAlertBoxShown: boolean = false;

  constructor(private router: Router, private http: HttpClient, private userService: UserService, private alertService: AlertService, public wallpaperService : WallpaperService) { }

  ngOnInit(): void {
  }

      login(){
        if(this.email && this.password)
          this.http.post("/api/login",{email: this.email, password:this.password})
            .subscribe((result: any)=>{
              this.userService.loginSuccess(this.email, result.name);
              this.router.navigateByUrl('/dashboard');
            },
            (error)=>{  
              if(error.status == 400 || error.status == 401){
                this.alertService.error("Invalid Username or Password", {autoClose: true});
              }   
              else{
                this.alertService.error("Error Occurred", {autoClose: true});
              }     
                
            });
        else{
            if(this.isAlertBoxShown == false){
              this.isAlertBoxShown = true;
              this.alertService.warn("Email and Password is required.", {autoClose: true});
            }
            setTimeout(()=>{
              this.isAlertBoxShown = false;
            }, environment.alertShownTime);
        }
  }

  register(){
    this.router.navigateByUrl('/register');
  }

}
