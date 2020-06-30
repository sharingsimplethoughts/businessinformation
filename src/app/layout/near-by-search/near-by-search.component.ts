import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
import { ManagementService } from 'src/app/layout/service/management.service';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router'; 
declare var $:any;
export interface PeriodicElement {
  id: string;
  name: string;
  icon: string;
  rating: string;
  latitude: string;
  longitude: string;
  address: string;
  placetype: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {id: '', name: '', icon: '', rating: '', latitude: '', longitude: '', address: '', placetype: ''},
];

@Component({
  selector: 'app-near-by-search',
  templateUrl: './near-by-search.component.html',
  styleUrls: ['./near-by-search.component.css']
})
export class NearBySearchComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'icon', 'rating', 'latitude', 'longitude', 'address']; //, 'placetype'
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
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
  
  placetypelist;
  ptypes;
  searchradius;
  latitude;
  longitude;
  busslist;
  constructor(
    private auth: AuthenticationService,
    private router:Router,
    private mgmt: ManagementService,
  ) {
    this.fromdate = new Date();
    this.todate = new Date();
  }
  ngOnInit() {
    if(!this.auth.isLogin()){
      console.log('Please login to access this page.')
      this.router.navigate(['login']);
    }
    this.mgmt.listPlaceTypes().subscribe(response=>{
      this.placetypelist = response['data']
      console.log(this.placetypelist)
    },error=>{
      console.log(error)
    })
    document.getElementById('tabdiv').style.display = 'none'



    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;   
    setTimeout(function(){
      $('#checkAll').on('click', function(){
        if($(this).is(':checked')){
          $(this).closest('.table').find('td').find('input[type=checkbox]').prop('checked', true);
        }else{
          $(this).closest('.table').find('td').find('input[type=checkbox]').prop('checked', false);
        }
      });
    }, 500);
  }
  // ptypes;searchradius;latitude;longitude;
  validateForm(){
    if(!this.ptypes || this.ptypes==''){
      this.loginError("Please select place type");
      return false;
    }
    if(!this.searchradius || this.searchradius==''){
      this.loginError("Please select search radius");
      return false;
    }
    if(!this.latitude || this.latitude==''){
      this.loginError("Please provide latitude");
      return false;
    }
    if(!this.longitude || this.longitude==''){
      this.loginError("Please provide longitude");
      return false;
    }
    if(!(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/.test(this.latitude))){
      this.loginError("Please provide valid latitude");
      return false;
    }
    if(!(this.latitude > -90 && this.latitude < 90)){
      this.loginError("Please provide valid latitude");
      return false;
    }
    if(!(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/.test(this.longitude))){
      this.loginError("Please provide valid longitude");
      return false;
    }
    // The latitude must be a number between -90 and 90 and the longitude between -180 and 180
    if(!(this.longitude > -180 && this.longitude < 180)){
      this.loginError("Please provide valid longitude");
      return false;
    }

    return true
  }
  cleanForm(){
    this.latitude=''
    this.longitude=''
    this.searchradius=''
    this.ptypes=''
    this.busslist=''
  }  
  searchPlace(){
    console.log('meu')
    if(this.validateForm()){
      let dataToSend = new FormData();
      dataToSend.append('latitude',this.latitude)
      dataToSend.append('longitude',this.longitude)
      dataToSend.append('radius',this.searchradius)
      dataToSend.append('place_type',this.ptypes)
      
      this.mgmt.searchNearbyBusiness(dataToSend).subscribe(response=>{
        console.log(response);
        this.busslist = response['data']
        console.log(this.busslist)
        if(this.busslist.length!=0){
          document.getElementById('tabdiv').style.display = 'block'
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.busslist);
        }
        else{
          this.loginError('Sorry! no nearby business found'); 
        }
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      },error=>{
        this.loginError(error.error.message); 
      });
    }
  }
  addPlace(){
    if(this.validateForm()){
      let dataToSend = new FormData();
      dataToSend.append('latitude',this.latitude)
      dataToSend.append('longitude',this.longitude)
      dataToSend.append('radius',this.searchradius)
      dataToSend.append('place_type',this.ptypes)
      console.log(this.latitude)
      console.log(this.longitude)
      console.log(this.searchradius)
      console.log(this.ptypes)
      
      this.mgmt.addNearbuBusiness(dataToSend).subscribe(response=>{
        console.log(response);
        this.loginSuccess("Data saved successfully");
        this.cleanForm()
        document.getElementById('tabdiv').style.display = 'none'
        // this.busslist = response['data']
        // this.dataSource = new MatTableDataSource<PeriodicElement>(this.busslist);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
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

