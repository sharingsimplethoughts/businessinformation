import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ManagementService } from 'src/app/layout/service/management.service'; 
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core'; 

@Component({
  selector: 'app-view-event-management',
  templateUrl: './view-event-management.component.html',
  styleUrls: ['./view-event-management.component.css']
})
export class ViewEventManagementComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private router:Router,
    private route: ActivatedRoute,
    private mgmt: ManagementService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  id;
  eventdetail;
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
      this.eventdetail = response['data']
      this.evlat = response['data']['lat']
      this.evlon = response['data']['lon']
      this.geoCoder = new google.maps.Geocoder;
      this.setCurrentLocation1(this.evlat,this.evlon);
      console.log(this.eventdetail)
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
