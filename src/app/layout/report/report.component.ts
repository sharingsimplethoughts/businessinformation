import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatTableDataSource } from '@angular/material';
declare var $:any;
export interface Total {
  userid: string;
  name: string;
  image: string;
  date: string;
}
export interface Business {
  userid: string;
  name: string;
  mobile: string;
  date: string;
  address: string;
  status: string;
}
export interface Event {
  userid: string;
  name: string;
  mobile: string;
  email: string;
  venue: string;
  count: number;
  status: string;
}
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    dataSource: Total[] = [
      {userid: '#354', name: 'Yogurt', image: 'assets/img/user2.jpg', date: '23/12/2020'},
   ];
     dataSource1: Business[] = [
      {userid: '#354', name: 'Yogurt', mobile: '9999999', date: '23/12/2020', address: 'Noida,India', status: 'pending'},
   ];
     dataSource2: Event[] = [
      {userid: '#354', name: 'Yogurt', mobile: '9999999', email: 'admin@gmail.com', venue: 'noida',count: 12, status: 'pending'},
   ];
   displayedColumns: string[] = ['userid','name', 'image','date','action'];
   displayedColumns1: string[] = ['userid','name', 'mobile','date','address', 'status'];

   displayedColumns2: string[] = ['userid','name', 'mobile', 'email','venue','count', 'status'];

  constructor() { }

  ngOnInit() {
    // Show the first tab by default
$('.tabs-stage div').hide();

$('.tabs-nav li:first').addClass('tab-active');
$('.tabs-stage div:first').show();
$('.tabs-stage div:first').find('div').show();
// Change tab class and display content
$('.tabs-nav a').on('click', function(event){
  event.preventDefault();
  $('.tabs-nav li').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
  $($(this).attr('href')).find('div').show();
});
  }

}
