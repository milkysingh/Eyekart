import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { User } from "../user.model";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user:User;
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit(form) {

    if (form.invalid) {
      return;
    }
    const sendData = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    }
this.authService.signUp(sendData).subscribe(
  (data) =>{
    console.log(data);

  }
)
  }
}


