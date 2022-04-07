import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUserById(id: string){
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`)
  }

  addUser(user: any){
    return this.http.post<any>(`${environment.apiUrl}/users/`, user);
  }

  updateUser(data: any, id: string){
    return this.http.put<any>(`${environment.apiUrl}/users/${id}`, data);
  }

  deleteUserById(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}
