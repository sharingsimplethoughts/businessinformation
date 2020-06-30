import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { User } from './model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    // private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User>;

    // constructor(private http: HttpClient) {
    //     this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    //     this.currentUser = this.currentUserSubject.asObservable();
    // }

    // public get currentUserValue(): User {
    //     return this.currentUserSubject.value;
    // }

    constructor(private router: Router, private http: HttpClient){}

    isLogin(){
        var token = localStorage.getItem('currentUser');
        if(token) return true;
        else false;
    }

    login(email: string, password: string) {
        return this.http.post(environment+`/admin/login`, { email, password });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.router.navigateByUrl('/login');
        // this.currentUserSubject.next(null);
        return true;
    }
}