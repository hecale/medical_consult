import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { SignInData } from '../model/siginData';
import { Router } from '@angular/router';

@Component({
  selector: 'cf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(signInForm: NgForm){
    console.log(signInForm.value);
    const signInData = new SignInData(signInForm.value.email, signInForm.value.password);
    if(this.authService.authenticate(signInData)) this.router.navigate(['./dashboard']);
  }

}
