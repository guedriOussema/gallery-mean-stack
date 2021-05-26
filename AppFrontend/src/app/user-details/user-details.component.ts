import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {


  @Input() user: User;
  @Input() errorMessage: any;
  @Output() formSubmit: EventEmitter<User> = new EventEmitter<User>();
  userExists: boolean = false;
  usernameExist: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    this.user = new User();
  }


  onFormSubmit(form: NgForm) {
    console.log(form);
    if (form.valid) {
      this.formSubmit.emit(form.value);
    }
  }

}
