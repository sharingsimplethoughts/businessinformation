import { Component, OnInit } from '@angular/core';
import { ManagementService } from 'src/app/layout/service/management.service'; 
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  about;
  aboutid;
  help;
  helpid;
  terms;
  termsid;
  legal;
  legalid;
  privacy;
  privacyid;
  errormessage;
  successmessage;
  constructor(
    private auth: AuthenticationService,
    private mgmt: ManagementService,
    private router:Router
  ) { }

  ngOnInit() {
    if(!this.auth.isLogin()){
      console.log('Please login to access this page.')
      this.router.navigate(['login']);
    }

    this.mgmt.getAbout().subscribe(response=>{
      this.about=response['data'][0]['about']
      this.aboutid=response['data'][0]['id']
      console.log(response['data'])
    },error=>{
      console.log(error.error.message);  
    })
    this.mgmt.getHelp().subscribe(response=>{
      this.help=response['data'][0]['Help_text']
      this.helpid=response['data'][0]['id']
      console.log(response['data'])
    },error=>{
      console.log(error.error.message);  
    })
    this.mgmt.getTerms().subscribe(response=>{
      this.terms=response['data'][0]['terms']
      this.termsid=response['data'][0]['id']
      console.log(response['data'])
    },error=>{
      console.log(error.error.message);  
    })
    this.mgmt.getLegal().subscribe(response=>{
      this.legal=response['data'][0]['legalinput']
      this.legalid=response['data'][0]['id']
      console.log(response['data'])
    },error=>{
      console.log(error.error.message);  
    })
    this.mgmt.getPrivacyPolicy().subscribe(response=>{
      this.privacy=response['data'][0]['policy']
      this.privacyid=response['data'][0]['id']
      console.log(response['data'])
    },error=>{
      console.log(error.error.message);  
    })
  }



  fillabout(){
    console.log('hi');
    (document.getElementById('about') as HTMLInputElement).value = this.about
  }
  fillterm(){
    console.log('hi');
    (document.getElementById('term') as HTMLInputElement).value = this.terms
  }
  filllegal(){
    console.log('hi');
    (document.getElementById('legal') as HTMLInputElement).value = this.legal
  }
  fillhelp(){
    console.log('hi');
    (document.getElementById('help') as HTMLInputElement).value = this.help
  }
  fillprivacypolicy(){
    console.log('hi');
    (document.getElementById('privacy') as HTMLInputElement).value = this.privacy
  }



  updateAbout(){
    var v = (document.getElementById('about') as HTMLInputElement).value.trim()
    if(!v || v==''){
      this.loginError("Please provide about text");
      return false;
    }
    var data={
      about: v
    }
    console.log(data)
    this.mgmt.updateAbout(data,this.aboutid).subscribe(response=>{
      console.log('Updated successfully');
      this.loginSuccess('updated successfully')
      location.reload();
    },error=>{
      console.log(error);  
    })
  }
  updateTerms(){
    var v = (document.getElementById('terms') as HTMLInputElement).value.trim()
    if(!v || v==''){
      this.loginError("Please provide terms and condition text");
      return false;
    }
    var data={
      terms: v
    }
    this.mgmt.updateTerms(data,this.termsid).subscribe(response=>{
      console.log('Updated successfully');
      this.loginSuccess('updated successfully')
      location.reload();
    },error=>{
      console.log(error.error.message);  
    })
  }
  updateLegal(){
    var v = (document.getElementById('legal') as HTMLInputElement).value.trim()
    if(!v || v==''){
      this.loginError("Please provide legals text");
      return false;
    }
    var data={
      legalinput: v
    }
    this.mgmt.updateLegal(data,this.legalid).subscribe(response=>{
      console.log('Updated successfully');
      this.loginSuccess('updated successfully');
      location.reload();
    },error=>{
      console.log(error.error.message);  
    })
  }
  updateHelp(){
    var v = (document.getElementById('help') as HTMLInputElement).value.trim()
    if(!v || v==''){
      this.loginError("Please provide help text");
      return false;
    }
    var data={
      Help_text: v
    }
    this.mgmt.updateHelp(data,this.helpid).subscribe(response=>{
      console.log('updated successfully');
      this.loginSuccess('Updated successfully')
      location.reload();
    },error=>{
      console.log(error.error.message);  
    })
  }
  updatePrivacyPolicy(){
    var v = (document.getElementById('privacy') as HTMLInputElement).value.trim()
    if(!v || v==''){
      this.loginError("Please provide privacy policy text");
      return false;
    }
    var data={
      policy: v
    }
    this.mgmt.updatePrivacyPolicy(data,this.privacyid).subscribe(response=>{
      console.log('updated successfully');
      this.loginSuccess('Updated successfully')
      location.reload();
    },error=>{
      console.log(error.error.message);  
    })
  }

  
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
