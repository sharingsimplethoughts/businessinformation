import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
declare var $:any;
export interface PeriodicElement {
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Hydrogen'},
  {name: 'Hydrogen'},
  {name: 'Hydrogen'},
  {name: 'Hydrogen'},
  {name: 'Hydrogen'},
  {name: 'Hydrogen'},
  {name: 'Hydrogen'},
  {name: 'Hydrogen'},
  {name: 'Hydrogen'},
  {name: 'Hydrogen'},
  {name: 'Hydrogen'},
  {name: 'Hydrogen'},
];

@Component({
  selector: 'app-notification-management',
  templateUrl: './notification-management.component.html',
  styleUrls: ['./notification-management.component.css']
})
export class NotificationManagementComponent implements OnInit {

  displayedColumns: string[] = ['checkbox', 'name'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }  

  constructor(){}

  ngOnInit() {
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
