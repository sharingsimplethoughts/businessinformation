import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Country} from '@angular-material-extensions/select-country';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
import { ManagementService } from 'src/app/layout/service/management.service'; 
import { MapsAPILoader, MouseEvent } from '@agm/core'; 
declare var $:any;
// declare var iEdit:any;

@Component({
  selector: 'app-edit-event-management',
  templateUrl: './edit-event-management.component.html',
  styleUrls: ['./edit-event-management.component.css']
})
export class EditEventManagementComponent implements OnInit {

  user;
  _id;
  editEventForm: FormGroup;
  submitted= false;
  selectedCountry;

  fromdate: Date;
  todate: Date;
  optionsFrom: DatepickerOptions = {
    minYear: 1990,
    maxDate: new Date(),
    locale: enLocale
  };
  optionsTo: DatepickerOptions = {
    minDate: this.todate,
    maxDate: new Date(),
  };
  fromDate($event){
    this.todate = $event;
    this.optionsTo = {
      minDate: this.todate,
      maxDate: new Date(),
      locale: enLocale
    }
  }
  
  @ViewChild('search',{static:true})
  public searchElementRef: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private mgmt: ManagementService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    ) { 
      this.fromdate = new Date();
      this.todate = new Date();
  }
  
  public firImgPath;
  firImgURL: any;
  
  public secImgPath;
  secImgURL: any;
 
  public thrImgPath;
  thrImgURL: any;

  onCountrySelected($event: Country) {
    console.log($event);
    this.editEventForm.patchValue({
      country: $event.name
    });
  }

  id;
  eventdetail;
  catlist;
  subcatlist;
  errormessage;
  successmessage;

  evid;
  evname;
  evcat;
  evsubcat;
  evemail;
  evmob;
  // evstdt;
  // evenddt;
  evsttime;
  evendtime;
  evpic1;
  evpic2;
  evpic3;
  evpic4;
  evdesc;
  evlat;
  evlon;




  ngOnInit() {
    if(!this.auth.isLogin()){
      console.log('Please login to access this page.')
      this.router.navigate(['login']);
    }
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.mgmt.getEventDetail(this.id).subscribe(response=>{
      this.eventdetail = response['data'];
      this.evid = this.eventdetail.id;
      this.evname = this.eventdetail.event_name;
      this.evcat = this.eventdetail.event_category;
      this.evsubcat = this.eventdetail.event_sub_category;
      this.evemail = this.eventdetail.event_email;
      this.evmob = this.eventdetail.event_contact_number;
      
      this.fromdate = new Date(this.eventdetail.event_start_date);
      this.todate = new Date(this.eventdetail.event_end_date);
      
      this.evsttime = this.eventdetail.event_start_time;
      this.evendtime = this.eventdetail.event_end_time;
      this.evpic1 = this.eventdetail.event_image1;
      this.evpic2 = this.eventdetail.event_image2;
      this.evpic3 = this.eventdetail.event_image3;
      this.evpic4 = this.eventdetail.event_image4;
      this.evdesc = this.eventdetail.event_description;
      this.evlat = this.eventdetail.lat;
      this.evlon = this.eventdetail.lon;
      console.log(this.eventdetail);
      // this.geoCoder = new google.maps.Geocoder;
      // this.setCurrentLocation1(this.evlat, this.evlon);

      // load Places Autocomplete.
      this.mapsAPILoader.load().then(() => {
        console.log('inside it')
        this.geoCoder = new google.maps.Geocoder;
        this.setCurrentLocation1(this.evlat,this.evlon);

        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            // this.latitude = this.evlat;
            // this.longitude = this.evlon;
            this.zoom = 12;
            this.getAddress(this.latitude, this.longitude);
          });
        });
      });




      this.mgmt.getEventSubcatList(this.eventdetail.event_category).subscribe(response=>{
        this.subcatlist = response['data']
        console.log(this.subcatlist)
      },error=>{
        console.log(error)
      })
    },error=>{
      console.log(error)
    })
    this.mgmt.getEventCatList().subscribe(response=>{
      this.catlist = response['data']
      console.log(this.catlist)
    },error=>{
      console.log(error)
    })
    
    



    //earlier unknown code--------------------------------------------
    this.editEventForm = this.formBuilder.group({
      eventId: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      timeFrom: ['', Validators.required],
      timeTo: ['', Validators.required],
      description: '',
    });
    //----------------------------------------------------------------
  }
 

  
  latitude;
  longitude;
  zoom;
  address: string;
  private geoCoder;
  private setCurrentLocation1(evlat,evlon) {
    this.latitude = evlat;
    this.longitude = evlon;
    this.zoom = 8;
    this.getAddress(this.latitude, this.longitude);
  }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
        console.log('Geocoder failed due to: ' + status)
      }

    });
  }
  

  single = new Array();
  picture1;
  picture2;
  picture3;
  picture4;
  singleFiles1(event) {
    console.log('*********************')
    const file1 = event.target.files[0]
    if(file1){
      if(file1.type!="image/jpeg" && file1.type!="image/jpg" && file1.type!="image/png"){
        this.loginError("Please upload files of type jpg/jpeg/png");
        return false;
      }
      if(file1.size>1000000000){
        this.loginError("Please upload files of maximum 10mb in size");
        return false;
      }
    }
    this.single = [];
    var singleFiles = event.target.files;
    if (singleFiles) {
      for (var file of singleFiles) {
        var singleReader = new FileReader();
        singleReader.onload = (e:any) => {
          this.single.push(e.target.result);
          document.getElementById("imagefile1").setAttribute('src',e.target.result);
        }
        singleReader.readAsDataURL(file);
      }
    }
    this.picture1 = event.target.files[0]
  }
  singleFiles2(event) {
    console.log('*********************')
    const file1 = event.target.files[0]
    if(file1){
      if(file1.type!="image/jpeg" && file1.type!="image/jpg" && file1.type!="image/png"){
        this.loginError("Please upload files of type jpg/jpeg/png");
        return false;
      }
      if(file1.size>1000000000){
        this.loginError("Please upload files of maximum 10mb in size");
        return false;
      }
    }
    this.single = [];
    var singleFiles = event.target.files;
    if (singleFiles) {
      for (var file of singleFiles) {
        var singleReader = new FileReader();
        singleReader.onload = (e:any) => {
          this.single.push(e.target.result);
          document.getElementById("imagefile2").setAttribute('src',e.target.result);
        }
        singleReader.readAsDataURL(file);
      }
    }
    this.picture2 = event.target.files[0]
  }
  singleFiles3(event) {
    console.log('*********************')
    const file1 = event.target.files[0]
    if(file1){
      if(file1.type!="image/jpeg" && file1.type!="image/jpg" && file1.type!="image/png"){
        this.loginError("Please upload files of type jpg/jpeg/png");
        return false;
      }
      if(file1.size>1000000000){
        this.loginError("Please upload files of maximum 10mb in size");
        return false;
      }
    }
    this.single = [];
    var singleFiles = event.target.files;
    if (singleFiles) {
      for (var file of singleFiles) {
        var singleReader = new FileReader();
        singleReader.onload = (e:any) => {
          this.single.push(e.target.result);
          document.getElementById("imagefile3").setAttribute('src',e.target.result);
        }
        singleReader.readAsDataURL(file);
      }
    }
    this.picture3 = event.target.files[0]
  }
  singleFiles4(event) {
    console.log('*********************')
    const file1 = event.target.files[0]
    if(file1){
      if(file1.type!="image/jpeg" && file1.type!="image/jpg" && file1.type!="image/png"){
        this.loginError("Please upload files of type jpg/jpeg/png");
        return false;
      }
      if(file1.size>1000000000){
        this.loginError("Please upload files of maximum 10mb in size");
        return false;
      }
    }
    this.single = [];
    var singleFiles = event.target.files;
    if (singleFiles) {
      for (var file of singleFiles) {
        var singleReader = new FileReader();
        singleReader.onload = (e:any) => {
          this.single.push(e.target.result);
          document.getElementById("imagefile4").setAttribute('src',e.target.result);
        }
        singleReader.readAsDataURL(file);
      }
    }
    this.picture4 = event.target.files[0]
  }
  getSubcatList(){
    console.log('------get sub cat-------')
    this.mgmt.getEventSubcatList(this.evcat).subscribe(response=>{
      this.subcatlist = response['data']
      console.log(this.subcatlist)
    },error=>{
      console.log(error)
    })
  }
  validateForm(){
    if(!this.evname || this.evname==''){
      this.loginError("Please add event name");
      return false;
    }
    this.evname = this.evname.trim()
    if(this.evname.length<2 || this.evname.length>50){
      this.loginError("Event name must contain in between 2 to 50 characters");
      return false;
    }
    if(!this.evcat || this.evcat==''){
      this.loginError("Please add event category");
      return false;
    }
    if(!this.evsubcat || this.evsubcat==''){
      this.loginError("Please add event subcategory");
      return false;
    }
    if(!this.evemail || this.evemail==''){
      this.loginError("Please add event email");
      return false;
    }
    if(!(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/.test(this.evemail))){
      this.loginError("Event email is not valid");
      return false;
    }
    this.evemail = this.evemail.trim()
    if(this.evemail.length>80){
      this.loginError("Event email must contain maximum of 80 characters");
      return false;
    }
    if(!this.evmob || this.evmob==''){
      this.loginError("Please add event contact number");
      return false;
    }
    if(!(/^[0-9]*$/.test(this.evmob))){
      this.loginError("Please provide numbers only in event contact number");
      return false;
    }
    this.evmob = this.evmob.trim()
    if(this.evmob.length<6 || this.evmob.length>15){
      this.loginError("Event contact number must contain in between 6 to 15 digits");
      return false;
    }
    if(!this.evdesc || this.evdesc==''){
      this.loginError("Please add event description");
      return false;
    }
    this.evdesc = this.evdesc.trim()
    if(this.evdesc.length<10 || this.evdesc.length>200){
      this.loginError("Event description must contain in between 10 to 200 characters");
      return false;
    }
    if(!this.latitude || this.latitude==''){
      this.loginError("Please add event location");
      return false;
    }
    if(!this.longitude || this.longitude==''){
      this.loginError("Please add event location");
      return false;
    }
    var d1 = new Date(this.fromdate.getFullYear(), this.fromdate.getMonth(), this.fromdate.getDate())
    var d2 = new Date(this.todate.getFullYear(), this.todate.getMonth(), this.todate.getDate())
    
    if(d1>d2){
      this.loginError("Event start date can't be greater than end date");
      return false;
    }
    if(!this.evsttime || this.evsttime==''){
      this.loginError("Please add event start time");
      return false;
    }
    if(!this.evendtime || this.evendtime==''){
      this.loginError("Please add event end time");
      return false;
    }
    if(d1.getTime()==d2.getTime()){
      if(this.evsttime>this.evendtime){
        this.loginError("Event start time can't be greater than end time for the same day");
        return false;
      }
    }
    // if(!this.picture1 || this.picture1==''){
    //   this.loginError("Please add event picture1");
    //   return false;
    // }
    // if(!this.picture2 || this.picture2==''){
    //   this.loginError("Please add event picture2");
    //   return false;
    // }
    // if(!this.picture3 || this.picture3==''){
    //   this.loginError("Please add event picture3");
    //   return false;
    // }
    // if(!this.picture4 || this.picture4==''){
    //   this.loginError("Please add event picture4");
    //   return false;
    // }

    return true
  }
  editEv(){
    console.log(this.picture1)
    if(this.validateForm()){
      var from = this.fromdate.getFullYear()+'-'+this.fromdate.getMonth().toString()+'-'+this.fromdate.getDate().toString()
      var to = this.todate.getFullYear()+'-'+this.todate.getMonth().toString()+'-'+this.todate.getDate().toString()

      let dataToSend = new FormData();
      dataToSend.append('event_name',this.evname)
      if(!this.picture1 || this.picture1==''){
        dataToSend.append('event_image1','')
      }
      else{
        dataToSend.append('event_image1',this.picture1)
      }
      if(!this.picture2 || this.picture2==''){
        dataToSend.append('event_image2','')
      }
      else{
        dataToSend.append('event_image2',this.picture2)
      }
      if(!this.picture3 || this.picture3==''){
        dataToSend.append('event_image3','')
      }
      else{
        dataToSend.append('event_image3',this.picture3)
      }
      if(!this.picture4 || this.picture4==''){
        dataToSend.append('event_image4','')
      }
      else{
        dataToSend.append('event_image4',this.picture4)
      }
      
      // dataToSend.append('event_image2',this.picture2)
      // dataToSend.append('event_image3',this.picture3)
      // dataToSend.append('event_image4',this.picture4)
      dataToSend.append('event_contact_number',this.evmob)
      dataToSend.append('event_description',this.evdesc)
      dataToSend.append('event_email',this.evemail)
      dataToSend.append('event_start_date',from)
      dataToSend.append('event_end_date',to)
      dataToSend.append('event_category',this.evcat)
      dataToSend.append('event_sub_category',this.evsubcat)
      dataToSend.append('event_start_time',this.evsttime)
      dataToSend.append('event_end_time',this.evendtime)
      dataToSend.append('lon',this.longitude)
      dataToSend.append('lat',this.latitude)
      dataToSend.append('venue',this.address)
      console.log(dataToSend)
      this.mgmt.editEvent(dataToSend,this.evid).subscribe(response=>{
        console.log(response);
        // this.cleanForm();
        this.loginSuccess("Event updated successfully");
        location.reload();
      },error=>{
        this.loginError(error.error.message); 
      });
    }
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






  //earlier unknown code--------------------------------------
  get f(){return this.editEventForm.controls}
  firImg(files) {
    var reader = new FileReader();
    this.firImgPath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.firImgURL = reader.result; 
    }
  }
  secImg(files) {
    var reader = new FileReader();
    this.secImgPath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.secImgURL = reader.result; 
    }
  }
  thrImg(files) {
    var reader = new FileReader();
    this.thrImgPath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.thrImgURL = reader.result; 
    }
  }
  // Profile Service
  errorMessage;
  successMessage;
  onSubmit(){
     
    this.submitted= true;

    if(this.editEventForm.invalid){
      return;
    }

    let data = {
      eventId: this.editEventForm.value.eventId,
      name: this.editEventForm.value.name,
      email: this.editEventForm.value.email,
      phone: this.editEventForm.value.phone,
      category: this.editEventForm.value.category,
      subcategory: this.editEventForm.value.subcategory,
      timeFrom: this.editEventForm.value.timeFrom,
      timeTo: this.editEventForm.value.timeTo,
      description: this.editEventForm.value.description,
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
  //------------------------------------------------------------

}
