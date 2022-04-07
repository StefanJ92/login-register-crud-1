import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string){
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, {email, password})
    .pipe(map(user => {
      user.authdata = window.btoa(email + ':' + password);
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }))
  }

  logout(){
    localStorage.removeItem('user');
    this.userSubject.next(null!);
    this.router.navigate(['/login'])
  }
}