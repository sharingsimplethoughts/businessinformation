import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router } from '@angular/router';
import {Country} from '@angular-material-extensions/select-country';

declare var $:any;
// declare var iEdit:any;

@Component({
  selector: 'app-edit-sub-admin-management',
  templateUrl: './edit-sub-admin-management.component.html',
  styleUrls: ['./edit-sub-admin-management.component.css']
})
export class EditSubAdminManagementComponent implements OnInit {

  user;
  _id;
  adsubadminForm: FormGroup;
  submitted= false;
  selectedCountry;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) { }
  

  onCountrySelected($event: Country) {
    console.log($event);
    this.adsubadminForm.patchValue({
      country: $event.name
    });
  }
  ngOnInit() {

    // $("#logo-file").change(function(e){
    //   var img = e.target.files[0];
    //   if(!iEdit.open(img, true, function(res){
    //   $("#result").attr("src", res);      
    //   })){
    //     alert("Whoops! That is not an image!");
    //   }
    // });

    this.adsubadminForm = this.formBuilder.group({
      countryAdminId: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: '',
      role: ['', Validators.required],
    });
    
  
  }

  
  
  get f(){return this.adsubadminForm.controls}

  // Profile Service
  errorMessage;
  successMessage;

  onSubmit(){
     
    this.submitted= true;

    if(this.adsubadminForm.invalid){
      return;
    }

    let data = {
      countryAdminId: this.adsubadminForm.value.countryAdminId,
      name: this.adsubadminForm.value.name,
      email: this.adsubadminForm.value.email,
      phone: this.adsubadminForm.value.phone,
      country: this.adsubadminForm.value.country,
      role: this.adsubadminForm.value.role,
    }
    data['_id'] = this.user._id;
     
     this.auth.profile(data).subscribe(
      data=>{
         
        console.log(data);
        localStorage.setItem('currentUser', JSON.stringify(data['response']));

        $("#success-modal").modal('show');
        this.successMessage = data['message']

        setTimeout(function(){
          $("#success-modal").modal('hide');
           
        },1500);
        setTimeout(() => {
          this.router.navigateByUrl('/profile');
        }, 1600);
      },
      error=>{
        console.log(error);
         
        this.errorMessage = error.error.message
      }
    )

  }
}
