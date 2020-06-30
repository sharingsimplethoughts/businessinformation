import { Component, OnInit } from '@angular/core';
import { ManagementService } from 'src/app/layout/service/management.service'; 
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-view-user-management',
  templateUrl: './view-user-management.component.html',
  styleUrls: ['./view-user-management.component.css']
})
export class ViewUserManagementComponent implements OnInit {
  user;
  id;
  constructor(
    private auth: AuthenticationService,
    private mgmt: ManagementService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if(!this.auth.isLogin()){
      console.log('Please login to access this page.')
      this.router.navigate(['login']);
    }
    this.mgmt.getUserBasicDetail(this.id).subscribe(response=>{
      this.user = response['data'][0]
      console.log(this.user)
    },error=>{
      console.log(error)
      // swal("", error.error['message'],'error')
    })
    
  }

}
