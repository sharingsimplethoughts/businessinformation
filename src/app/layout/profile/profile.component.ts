import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileimg
  currentUser
  constructor() { }

  

  ngOnInit() {
    this.currentUser= JSON.parse(localStorage.getItem('currentUser'))
    this.profileimg = this.currentUser ? (this.currentUser.profileimg ? (environment.picUrl +  this.currentUser.profileimg)  : "../../assets/img/user1.jpg") : "../../assets/img/user1.jpg" 
  }

}
