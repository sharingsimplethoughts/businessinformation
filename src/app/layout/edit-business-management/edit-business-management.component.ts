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
  selector: 'app-edit-business-management',
  templateUrl: './edit-business-management.component.html',
  styleUrls: ['./edit-business-management.component.css']
})
export class EditBusinessManagementComponent implements OnInit {

  user;
  _id;
  editBusinessForm: FormGroup;
  submitted= false;
  selectedCountry;

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
  ) { }
  
  public firImgPath;
  firImgURL: any;
  
  public secImgPath;
  secImgURL: any;
 
  public thrImgPath;
  thrImgURL: any;

  onCountrySelected($event: Country) {
    console.log($event);
    this.editBusinessForm.patchValue({
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
  bussiness_days;
  sun=false;mon=false;tue=false;wed=false;thr=false;fri=false;sat=false;
  rating;

  ngOnInit() {
    if(!this.auth.isLogin()){
      console.log('Please login to access this page.')
      this.router.navigate(['login']);
    }
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.mgmt.getBussinessDetail(this.id).subscribe(response=>{
      this.eventdetail = response['data'];
      this.evid = this.eventdetail.id;
      this.evname = this.eventdetail.business_name;
      this.evcat = this.eventdetail.business_category_id;
      this.evsubcat = this.eventdetail.business_sub_category_id;
      this.evemail = this.eventdetail.business_email;
      this.evmob = this.eventdetail.business_contact_number;
      
      // this.fromdate = new Date(this.eventdetail.event_start_date);
      // this.todate = new Date(this.eventdetail.event_end_date);
      
      this.evsttime = this.eventdetail.time_from;
      this.evendtime = this.eventdetail.time_to;
      this.evpic1 = this.eventdetail.business_image1;
      this.evpic2 = this.eventdetail.business_image2;
      this.evpic3 = this.eventdetail.business_image3;
      this.evpic4 = this.eventdetail.business_image4;
      this.evdesc = this.eventdetail.business_description;
      this.evlat = this.eventdetail.lat;
      this.evlon = this.eventdetail.lon;
      this.bussiness_days = this.eventdetail.business_days;
      this.rating = this.eventdetail.rating;
      
      if(this.bussiness_days.includes('0')){
        this.sun=true;
      }
      if(this.bussiness_days.includes('1')){
        this.mon=true;
      }
      if(this.bussiness_days.includes('2')){
        this.tue=true;
      }
      if(this.bussiness_days.includes('3')){
        this.wed=true;
      }
      if(this.bussiness_days.includes('4')){
        this.thr=true;
      }
      if(this.bussiness_days.includes('5')){
        this.fri=true;
      }
      if(this.bussiness_days.includes('6')){
        this.sat=true;
      }


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




      this.mgmt.getBussinessSubcatList(this.eventdetail.business_category_id).subscribe(response=>{
        this.subcatlist = response['data']
        console.log(this.subcatlist)
      },error=>{
        console.log(error)
      })
    },error=>{
      console.log(error)
    })
    this.mgmt.getBussinessCatList().subscribe(response=>{
      this.catlist = response['data']
      console.log(this.catlist)
    },error=>{
      console.log(error)
    })

    //earlier code------------------------------------
    // $("#logo-file").change(function(e){
    //   var img = e.target.files[0];
    //   if(!iEdit.open(img, true, function(res){
    //   $("#result").attr("src", res);      
    //   })){
    //     alert("Whoops! That is not an image!");
    //   }
    // });
    this.editBusinessForm = this.formBuilder.group({
      businessId: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      timeFrom: ['', Validators.required],
      timeTo: ['', Validators.required],
      description: '',
    });
    //---------------------------------------------------------
  
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
    this.mgmt.getBussinessSubcatList(this.evcat).subscribe(response=>{
      this.subcatlist = response['data']
      console.log(this.subcatlist)
    },error=>{
      console.log(error)
    })
  }
  validateForm(){
    if(!this.evname || this.evname==''){
      this.loginError("Please add business name");
      return false;
    }
    this.evname = this.evname.trim()
    if(this.evname.length<2 || this.evname.length>50){
      this.loginError("Business name must contain in between 2 to 50 characters");
      return false;
    }
    if(!this.evcat || this.evcat==''){
      this.loginError("Please add business category");
      return false;
    }
    if(!this.evsubcat || this.evsubcat==''){
      this.loginError("Please add business subcategory");
      return false;
    }
    if(!this.evemail || this.evemail==''){
      this.loginError("Please add business email");
      return false;
    }
    if(!(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/.test(this.evemail))){
      this.loginError("Business email is not valid");
      return false;
    }
    this.evemail = this.evemail.trim()
    if(this.evemail.length>80){
      this.loginError("Business email must contain maximum of 80 characters");
      return false;
    }
    if(!this.evmob || this.evmob==''){
      this.loginError("Please add business contact number");
      return false;
    }
    if(!(/^[0-9]*$/.test(this.evmob))){
      this.loginError("Please provide numbers only in business contact number");
      return false;
    }
    this.evmob = this.evmob.trim()
    if(this.evmob.length<6 || this.evmob.length>15){
      this.loginError("Business contact number must contain in between 6 to 15 digits");
      return false;
    }
    if(!this.evdesc || this.evdesc==''){
      this.loginError("Please add business description");
      return false;
    }
    this.evdesc = this.evdesc.trim()
    if(this.evdesc.length<10 || this.evdesc.length>200){
      this.loginError("Business description must contain in between 10 to 200 characters");
      return false;
    }
    if(!this.latitude || this.latitude==''){
      this.loginError("Please add business location");
      return false;
    }
    if(!this.longitude || this.longitude==''){
      this.loginError("Please add business location");
      return false;
    }
    if(this.sun==false&&this.mon==false&&this.tue==false&&this.wed==false&&this.thr==false&&this.fri==false&&this.sat==false){
      this.loginError("Please add business days under business timings");
      return false;
    }
    // var d1 = new Date(this.fromdate.getFullYear(), this.fromdate.getMonth(), this.fromdate.getDate())
    // var d2 = new Date(this.todate.getFullYear(), this.todate.getMonth(), this.todate.getDate())
    
    // if(d1>d2){
    //   this.loginError("Event start date can't be greater than end date");
    //   return false;
    // }
    if(!this.evsttime || this.evsttime==''){
      this.loginError("Please add business start time");
      return false;
    }
    if(!this.evendtime || this.evendtime==''){
      this.loginError("Please add business end time");
      return false;
    }
    if(this.evsttime>this.evendtime){
      this.loginError("Business start time can't be greater than end time for the same day");
      return false;
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
    if(!this.rating || this.rating==''){
      this.loginError("Please select business rating");
      return false;
    }
    return true
  }
  editEv(){
    console.log(this.picture1)
    var bdays=""
    if(this.validateForm()){
      // var from = this.fromdate.getFullYear()+'-'+this.fromdate.getMonth().toString()+'-'+this.fromdate.getDate().toString()
      // var to = this.todate.getFullYear()+'-'+this.todate.getMonth().toString()+'-'+this.todate.getDate().toString()

      let dataToSend = new FormData();
      dataToSend.append('business_name',this.evname)
      if(!this.picture1 || this.picture1==''){
        dataToSend.append('business_image1','')
      }
      else{
        dataToSend.append('business_image1',this.picture1)
      }
      if(!this.picture2 || this.picture2==''){
        dataToSend.append('business_image2','')
      }
      else{
        dataToSend.append('business_image2',this.picture2)
      }
      if(!this.picture3 || this.picture3==''){
        dataToSend.append('business_image3','')
      }
      else{
        dataToSend.append('business_image3',this.picture3)
      }
      if(!this.picture4 || this.picture4==''){
        dataToSend.append('business_image4','')
      }
      else{
        dataToSend.append('business_image4',this.picture4)
      }
      
      // dataToSend.append('event_image2',this.picture2)
      // dataToSend.append('event_image3',this.picture3)
      // dataToSend.append('event_image4',this.picture4)
      dataToSend.append('business_contact_number',this.evmob)
      dataToSend.append('business_description',this.evdesc)
      dataToSend.append('business_email',this.evemail)
      // dataToSend.append('event_start_date',from)
      // dataToSend.append('event_end_date',to)
      dataToSend.append('business_category_id',this.evcat)
      dataToSend.append('business_sub_category_id',this.evsubcat)
      dataToSend.append('time_from',this.evsttime)
      dataToSend.append('time_to',this.evendtime)
      dataToSend.append('lon',this.longitude)
      dataToSend.append('lat',this.latitude)
      dataToSend.append('address',this.address)
      if(this.sun==true){
        bdays=bdays+"0,"
      }
      if(this.mon==true){
        bdays=bdays+"1,"
      }
      if(this.tue==true){
        bdays=bdays+"2,"
      }
      if(this.wed==true){
        bdays=bdays+"3,"
      }
      if(this.thr==true){
        bdays=bdays+"4,"
      }
      if(this.fri==true){
        bdays=bdays+"5,"
      }
      if(this.sat==true){
        bdays=bdays+"6,"
      }
      bdays = bdays.substr(0, bdays.length - 1);

      dataToSend.append('business_days',bdays)
      dataToSend.append('rating',this.rating)
      
      console.log(dataToSend)
      this.mgmt.editBussiness(dataToSend,this.evid).subscribe(response=>{
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


















  //earlier code-----------------------------------------
  get f(){return this.editBusinessForm.controls}

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

    if(this.editBusinessForm.invalid){
      return;
    }

    let data = {
      businessId: this.editBusinessForm.value.businessId,
      name: this.editBusinessForm.value.name,
      email: this.editBusinessForm.value.email,
      phone: this.editBusinessForm.value.phone,
      category: this.editBusinessForm.value.category,
      subcategory: this.editBusinessForm.value.subcategory,
      timeFrom: this.editBusinessForm.value.timeFrom,
      timeTo: this.editBusinessForm.value.timeTo,
      description: this.editBusinessForm.value.description,
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
