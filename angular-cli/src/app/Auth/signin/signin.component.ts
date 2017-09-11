import { Component, OnInit } from '@angular/core';
import {AuthService  } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(form) {
    const sendData = {
      email: form.value.email,
      password: form.value.password
    }
    this.authService.signIn(sendData).subscribe(
      (response) => {
        this.router.navigate(["/"]);
      }
    );
  }


}

