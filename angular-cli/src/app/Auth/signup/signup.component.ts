import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import { Router } from "@angular/router";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user:User;
  constructor(private authService: AuthService,private router:Router) {}

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
      (data) => {
        this.authService.loadDataFromLocalStorage();
        this.router.navigate(['/']);
        console.log(data);
      }
    )
  }
  }



