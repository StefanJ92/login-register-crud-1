import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Role } from '../model/role';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!: string;

  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    // if (this.loginForm.valid) {
    //   this.authentication.login(this.f['email'].value, this.f['password'].value).subscribe({
    //     next: (res) => {
    //       const user = res.find((a:any) => {
    //         return (
    //           a.email === this.loginForm.value.email &&
    //           a.password === this.loginForm.value.password
    //         )
    //       });
    //       if(user) {
    //         if(this.loginForm.value.role === Role.Admin)
    //         {
    //           this.loginForm.reset();
    //           this.router.navigate(['/admin']);
    //         } else {
    //           this.loginForm.reset();
    //           this.router.navigate(['/user']);
    //         }
    //       } else {
    //         alert('User not found');
    //       }
    //     },
    //     error: () => {
    //       console.log('Doesn`t existed')
    //     }
    //   })
    // }
    
    // const email = this.loginForm.value.email;
    // const password = this.loginForm.value.password;

    // this.authentication.login(email, password).subscribe({
    //   next: (res) => {
    //     console.dir(res);
    //   },
    //   error: () => {
    //     console.log('error');
    //   },
    // });
    // this.loginForm.reset();
  }

}
