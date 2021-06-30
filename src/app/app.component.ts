import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'cf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'med-app';

  constructor(public authService:AuthService){

  }

  logout(){
    this.authService.logout();
  }
}
