import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
declare var $:any;
export interface PeriodicElement {
  adminid: string;
  name: string;
  date: string;
  time: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {adminid: 'BHGV5451', name: 'Hydrogen', date: '22/02/2020', time: '12:00 PM', action: 'Data'},
  {adminid: 'BHGV5451', name: 'Adrogen', date: '22/02/2020', time: '12:00 PM', action: 'Data'},
];

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {

  displayedColumns: string[] = ['adminid', 'name', 'image', 'date', 'time', 'action'];
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
