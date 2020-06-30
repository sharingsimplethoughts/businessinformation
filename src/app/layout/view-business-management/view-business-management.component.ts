import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ManagementService } from 'src/app/layout/service/management.service'; 
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core'; 


@Component({
  selector: 'app-view-business-management',
  templateUrl: './view-business-management.component.html',
  styleUrls: ['./view-business-management.component.css']
})
export class ViewBusinessManagementComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private router:Router,
    private route: ActivatedRoute,
    private mgmt: ManagementService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  id;
  bussdetail;
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
    this.mgmt.getBussinessDetail(this.id).subscribe(response=>{
      this.bussdetail = response['data']
      this.evlat = response['data']['lat']
      this.evlon = response['data']['lon']
      this.geoCoder = new google.maps.Geocoder;
      this.setCurrentLocation1(this.evlat,this.evlon);
      console.log(this.bussdetail)
    },error=>{
      console.log(error)
      // swal("", error.error['message'],'error')
    })
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
    // this.getAddress(this.latitude, this.longitude);
  }

}
