import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  submitted= false;
  
  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthenticationService, 
    private router: Router
  ) { }

  ngOnInit() {

    var remembered = window.localStorage.getItem('rememberMe');

    if(remembered==undefined){
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      });
    }else{
      let rem = JSON.parse(remembered);
      this.loginForm = this.formBuilder.group({
        email: [rem.email, [Validators.required, Validators.email]],
        password: [rem.password, [Validators.required, Validators.minLength(8)]]
      });
    }

  }

  get f(){return this.loginForm.controls;}

  // Login Service
  invalidLogin= false;
  // errorMessage;
  // successMessage;

  errormessage;
  successmessage;

  onSubmit(){
    if($('#rememberMe').is(':checked')){
      let remember={
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }
      window.localStorage.setItem('rememberMe', JSON.stringify(remember));
    }else{
      window.localStorage.removeItem('rememberMe');
    }
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    let data = {
      //username: "",  //need to be deleted
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    
    this.auth.login(data).subscribe(
      data=> {
        localStorage.setItem('currentUser', JSON.stringify(data['data']));
        // this.successMessage = data['message']
        this.router.navigateByUrl('/home/dashboard');
      },
      error=> {
        console.log(error);
        this.invalidLogin = true
        this.loginError(error.error.message); 
        // this.errorMessage = error.error.message
      }
    );
  }
  loginError(e) {
    console.log(e);
    this.errormessage = e;
    setTimeout(() => {
      this.errormessage = "";
    }, 4000);
  }

}
