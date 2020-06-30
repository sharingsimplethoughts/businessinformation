import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profile_image
  name
  user
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    this.name = this.user.fullname 
    this.profile_image = this.user.profileimg
    $('.sidenav-toggler').on('click', function(){
      $(this).toggleClass('collapsed');
      $('.sidenav-collapse .sidenav').toggleClass('sidenav-collapsed');
      $('body').toggleClass('layout-sidebar-collapsed');
      if($(this).hasClass('collapsed')){
        $(this).attr('title', 'Expand sidenav ( ] )')
      }else{
        $(this).attr('title', 'Collapse sidenav ( [ )')
      }
    });

  }

  searchToggle(){
    document.getElementById('searchA').classList.toggle('active')
  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login')
  }
}
