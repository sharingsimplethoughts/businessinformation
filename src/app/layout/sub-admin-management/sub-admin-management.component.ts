import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
declare var $:any;
export interface PeriodicElement {
  adminid: string;
  name: string;
  contact: number;
  email: string;
  country: string;
  module: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {adminid: 'BHGV5451', name: 'Hydrogen', contact: 9988776655, email: 'xyz@gmial.com', country: 'India', module: 'M1, M2'},
  {adminid: 'BHGV5451', name: 'Adrogen', contact: 9988776655, email: 'xyz@gmial.com', country: 'India', module: 'M1, M2'},
];

@Component({
  selector: 'app-sub-admin-management',
  templateUrl: './sub-admin-management.component.html',
  styleUrls: ['./sub-admin-management.component.css']
})
export class SubAdminManagementComponent implements OnInit {

  displayedColumns: string[] = ['adminid', 'name', 'image', 'contact', 'email', 'country', 'module', 'action'];
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
  
  constructor() {
    this.fromdate = new Date();
    this.todate = new Date();
  }
  ngOnInit() {
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

}
