import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  errorMessage: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signup(userDetails: User) {
    this.authService.signup(userDetails.username, userDetails.password)
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.router.navigateByUrl('/home');
      },
      (err)=>{
        this.errorMessage = "Username already exists."
      })
  }

}
