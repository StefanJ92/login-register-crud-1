import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  userForm!: FormGroup;
  mainRole: string[] = ['user', 'admin'];
  useRole!: string;
  actionBtn: string = 'Create';

  constructor(
    private formBuilde: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    private dialogRef: MatDialogRef<AddEditComponent>
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilde.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });

    if (this.editUser) {
      this.actionBtn = 'Update';
      this.userForm.controls['firstName'].setValue(this.editUser.firstName);
      this.userForm.controls['lastName'].setValue(this.editUser.lastName);
      this.userForm.controls['email'].setValue(this.editUser.email);
      this.userForm.controls['password'].setValue(this.editUser.password);
      this.userForm.controls['role'].setValue(this.editUser.role);
    }
  }

  addUser() {
    if (!this.editUser) {
      if (this.userForm.valid) {
        this.userService.addUser(this.userForm.value).subscribe({
          next: (res) => {
            console.log('Successful');
            this.userForm.reset();
            this.dialogRef.close('create');
          },
          error: (err) => {
            console.log('Error');
          },
        });
      }
    } else {
      this.updateUser();
    }
  }

  updateUser() {
    this.userService
      .updateUser(this.userForm.value, this.editUser.id)
      .subscribe({
        next: (res) => {
          console.log('Update successfully');
          this.userForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          console.log('Error');
        },
      });
  }
}
