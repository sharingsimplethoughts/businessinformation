import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router } from '@angular/router';
import {Country} from '@angular-material-extensions/select-country';

declare var $:any;
declare var iEdit:any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  errormessage;
  successmessage;
  successMessage;
  user;
  _id;
  profileForm: FormGroup;
  submitted= false;
  selectedCountry;
  profile_image
  selected
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) { }
  
  ngOnInit() {
    // $("#logo-file").change(function(e){
    //   this.selected = e.target.files[0];
    //   if(!iEdit.open(this.selected, true, function(res){
    //   $("#result").attr("src", res);      
    //   })){
    //     alert("Whoops! That is not an image!");
    //   }
    // });

    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      // address: '',
      // region: '',
      // description: '',
    });
    
    this.user= JSON.parse(localStorage.getItem('currentUser'))
    this.profile_image = this.user.profileimg
    // this._id = this.user._id 
    this.profileForm.patchValue({
      name: this.user.fullname,
      email: this.user.email,
      phone: this.user.mobile_number,
      // address: this.user.address,
      // region: this.user.region,
      // description: this.user.description,
    });
  }

  front = new Array<string>();

  frontFiles(event) {
    this.front = [];
    let frontFiles = event.target.files;
    if (frontFiles) {
      this.selected = frontFiles[0];
      for (let file of frontFiles) {
        let frontReader = new FileReader();
        frontReader.onload = (e: any) => {
          this.front.push(e.target.result);
          $("#frontImg").attr("src", e.target.result);
        };
        frontReader.readAsDataURL(file);
      }
    }
  }

  
  get f(){return this.profileForm.controls}

  // Profile Service
  first_name;
  last_name;
  
  onSubmit(){
     
    this.submitted= true;

    if(this.profileForm.invalid){
      return;
    }
    // if(!this.selected)
    //   this.loginError("Please enter the profile image!");
    //   return false;

    let tname = this.profileForm.value.name
    if(/\d/.test(tname)){
      this.loginError("Name can not contain numbers");
      return false;
    }
    else if(/[~`@!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(tname)){
      this.loginError("Name can not contain special characters")
      return false;
    } 
    else if(tname.length<2 || tname.length>64){
      this.loginError("Name must contain in between 2 to 64 characters");
      return false;
    }


    if(this.profileForm.value.name.includes(' ')){
      let spstr = this.profileForm.value.name.split(' ',2)
      this.first_name = spstr[0]
      this.last_name = spstr[1]
    }  
    else{
      this.first_name = this.profileForm.value.name
      this.last_name = ''
    }
    
    
    
    const formData = new FormData();
    formData.append('profileimg', this.selected ? this.selected : 'NA');
    formData.append('first_name', this.first_name ? this.first_name : 'NA');
    formData.append('last_name', this.last_name ? this.last_name : 'NA');
    formData.append('mobile_number', this.profileForm.value.phone ? this.profileForm.value.phone : 'NA');
    formData.append('email', this.profileForm.value.email ? this.profileForm.value.email : 'NA');
    formData.append('country_code','+91')
     
     this.auth.profile(formData).subscribe(
      data=>{
        
        let cdata = data['data']
        let ldata = JSON.parse(localStorage.getItem('currentUser'))
        ldata['mobile_number']=cdata['mobile_number']
        ldata['profileimg']=cdata['profileimg']
        ldata['fullname']=cdata['first_name']+' '+cdata['last_name']
        localStorage.setItem('currentUser', JSON.stringify(ldata));
        
        $("#success-modal").modal('show');
        this.successMessage = data['message']
        // this.loginSuccess("Profile updated successfully");

        setTimeout(function(){
          $("#success-modal").modal('hide');
           
        },1500);
        setTimeout(() => {
          this.router.navigateByUrl('home/profile');
        }, 1600);
      },
      error=>{
        console.log(error);
        this.loginError(error.error.message);
      }
    )
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
