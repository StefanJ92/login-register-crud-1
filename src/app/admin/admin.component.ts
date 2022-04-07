import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { UserService } from '../_services/user.service';
import { User } from '../model/user';
import { AddEditComponent } from './add-edit/add-edit.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'action'
  ];

  dataSourceUser!:MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    public userService: UserService
    ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUser().subscribe({
      next: (data) => {
        this.dataSourceUser = new MatTableDataSource(data);
        this.dataSourceUser.paginator = this.paginator;
        this.dataSourceUser.sort = this.sort;
      },
      error: (err) => {
        console.log('Error');
      },
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(AddEditComponent, {
      height: '70%',
      width: '500px',
    }).afterClosed().subscribe(val => {
      if(val === 'create'){
        this.getAllUsers();
      }
    });
  }

  editUser(element: any){
    this.dialog.open(AddEditComponent,{
      height: '70%',
      width: '500px',
      data: element
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllUsers();
      }
    })
  }

  deleteUserById(id: string){
    this.userService.deleteUserById(id)
    .subscribe({
      next:(res) => {
        alert('You have deleted user');
        this.getAllUsers();
      },
      error:() => {
        alert('Error');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceUser.paginator) {
      this.dataSourceUser.paginator.firstPage();
    }
  }
}
