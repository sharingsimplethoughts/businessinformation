import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService{

    constructor(
        private router: Router,
        private http: HttpClient
    ){}
    
    
    isLogin(){
        var token = localStorage.getItem('currentUser');
        if(token) return true;
        else false;
    }

    login(data){   
        return this.http.post(environment.baseUrl+`login`, data);
    }

    forgot(email: string) {
        return this.http.post(environment.baseUrl+`password/reset/link/generate`, { email });
    }
    reset(data) {
        return this.http.post(environment.baseUrl+`resetPassword`, data);
    }

    profile(data) {
        return this.http.post(environment.baseUrl+`admin_profile/edit`, data);
    }

    logout(){
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberMe');
        this.router.navigateByUrl('login');
        return true;
    }
}