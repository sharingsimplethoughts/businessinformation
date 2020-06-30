import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatTableDataSource } from '@angular/material';
export interface Support {
  userid: string;
  name: string;
  image: string;
  email: string;
  country: string;
  date: string;
}

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  dataSource: Support[] = [
      {userid: '#354', name: 'Yogurt', image: 'dskjgh', email: 'admin@gmail.com', date: '23/12/2020', country: 'India'},
   ];
   displayedColumns: string[] = ['userid','name', 'image','email', 'date','country', 'action'];

  constructor() { }

  ngOnInit() {
  }

}
