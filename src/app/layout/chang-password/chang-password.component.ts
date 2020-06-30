import { Component, OnInit } from '@angular/core';
import { ManagementService } from 'src/app/layout/service/management.service';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chang-password',
  templateUrl: './chang-password.component.html',
  styleUrls: ['./chang-password.component.css']
})
export class ChangPasswordComponent implements OnInit {

  oldp;
  newp;
  confp;

  constructor(
    private auth: AuthenticationService,
    private router:Router,
    private mgmt: ManagementService,
  ) { }

  ngOnInit() {
    if(!this.auth.isLogin()){
      console.log('Please login to access this page.')
      this.router.navigate(['login']);
    }
  }
  validateForm(){
    if(!this.oldp || this.oldp==''){
      this.loginError("Please provide current password");
      return false;
    }
    if(!this.newp || this.newp==''){
      this.loginError("Please provide new password");
      return false;
    }
    if(!this.confp || this.confp==''){
      this.loginError("Please provide confirm password");
      return false;
    }
    if(this.newp!=this.confp){
      this.loginError("New password and confirm password not matching");
      return false;
    }
    return true
  }
  cleanForm(){
    this.oldp=''
    this.newp=''
    this.confp=''
  }

  changeP(){
    if(this.validateForm()){
      let dataToSend = new FormData();
      dataToSend.append('oldPassword',this.oldp)
      dataToSend.append('newPassword',this.newp)
      this.mgmt.changePassword(dataToSend).subscribe(response=>{
        console.log(response);
        this.cleanForm();
        this.loginSuccess("Password changed successfully");
        this.auth.logout();
        this.router.navigateByUrl('/login')
      },error=>{
        this.loginError(error.error.message); 
      });
    }
  }

  errormessage;
  successmessage;
  loginError(e) {
    console.log(e);
    this.errormessage = e;
    setTimeout(() => {
      this.errormessage = "";
    }, 4000);
  }
  loginSuccess(e) {
    console.log(e);
    this.successmessage = e;
    setTimeout(() => {
      this.successmessage = "";
    }, 4000);
  }
}
