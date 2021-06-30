import { Injectable } from '@angular/core';
import { SignInData } from 'src/app/auth/model/siginData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  //private readonly mockedUser = new SignInData('admin@admin.com','123456');
  private readonly mockedUser = new SignInData('1','1');
  isAuthenticated = false;

  constructor(private router: Router) { }

  authenticate(signInData: SignInData): boolean{
    if(this.checkCredentials(signInData)){
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

  private checkCredentials(signInData: SignInData): boolean{
    return this.checkEmail(signInData.getEmail()) && this.checkPassword(signInData.getPassword());
  }

  private checkEmail(email: string): boolean{
    return email === this.mockedUser.getEmail();
  }

  private checkPassword(passweord: string): boolean{
    return passweord === this.mockedUser.getPassword();
  }

  logout(){
    this.isAuthenticated = false;
    this.router.navigate[''];
  }
}


