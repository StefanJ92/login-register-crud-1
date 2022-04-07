import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { CustomeValidators } from './custom-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  singUpForm!: FormGroup;

  mainRole: string[] = ['user', 'admin'];

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.singUpForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required],
      },
      CustomeValidators.mustMatch('password', 'confirmPassword')
    );
  }

  get f() {
    return this.singUpForm.controls;
  }

  signUp() {
    this.submitted = true;
    if(this.singUpForm.valid) {
      this.userService.addUser(this.singUpForm.value)
        .subscribe({
          next: (res) => {
            if(res){
              console.dir(res);
              alert('Register successfull');
              this.singUpForm.reset();
              this.router.navigate(['login']);
            } else {
              alert('Enter empty field');
            this.singUpForm.reset();
            this.router.navigate(['register']);
            }
            
          },
          error: (err) => {
            alert('Something is wrong');
          }
        });
    }
  }

}
