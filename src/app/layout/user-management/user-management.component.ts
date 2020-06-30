import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
import { ManagementService } from 'src/app/layout/service/management.service'; 
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
declare var $:any;
declare var swal:any;
export interface PeriodicElement {
  userid: string;
  name: string;
  contact: number;
  email: string;
  date: string;
  location: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {userid: 'BHGV5451', name: 'Hydrogen', contact: 9988776655, email: 'xyz@gmial.com', date: '22/03/2020', location: 'Delhi', status: 'active'},
  {userid: 'BHGV5451', name: 'Adrogen', contact: 9988776655, email: 'xyz@gmial.com', date: '22/03/2020', location: 'Delhi', status: 'active'},
];
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  dataSource;
  displayedColumns: string[] = ['userid', 'name', 'image', 'contact', 'email', 'date', 'action']; //'location', 'status',
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  
  
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  fromdate: Date;
  todate: Date;
  users;
  tempid;


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
  
  constructor(
    private auth: AuthenticationService,
    private mgmt: ManagementService,
    private router:Router
  ) {
    this.fromdate = new Date();
    this.todate = new Date();
  }
  ngOnInit() {
    if(!this.auth.isLogin()){
      console.log('Please login to access this page.')
      this.router.navigate(['login']);
    }
    this.mgmt.getUserList().subscribe(response=>{
      this.users = response['data']
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.users)
    },error=>{
      console.log(error)
      // swal("", error.error['message'],'error') 
    })

    
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

  idShift(id){
    this.tempid=id;
    console.log(this.tempid);
  }
  blockClick(){
    this.mgmt.blockUser(this.tempid).subscribe(response=>{
      console.log('blocked successfully');
      location.reload();
    },error=>{
      console.log(error.error.message);  
    })
  }
  unblockClick(){
    this.mgmt.unblockUser(this.tempid).subscribe(response=>{
      console.log('unblocked successfully');
      location.reload();
    },error=>{
      console.log(error.error.message);  
    })
  }
  filterButton(){
    var from = this.fromdate.getDate().toString()+'/'+this.fromdate.getMonth().toString()+'/'+this.fromdate.getFullYear()
    var to = this.todate.getDate().toString()+'/'+this.todate.getMonth().toString()+'/'+this.todate.getFullYear()
    var data = {
      startdate:from,
      enddate:to
    }
    console.log(data)
    this.mgmt.getUserListByDate(data).subscribe(response=>{
      console.log(response['data']);
      this.users = response['data']
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.users);
    },error=>{
      console.log(error.error.message);  
    })
  }

  
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef; 
  exportData(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'AccountSheet.xlsx');
  }

  // ExportTOExcel() {  
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  //   XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
  // }  
  // team: any = [{  
  //   Sno: 1,  
  //   Team: 'India',  
  //   Match: 8,  
  //   Win: 7,  
  //   Loss: 0,  
  //   Cancel: 1,  
  //   Point: 15  
  
  // }, {  
  //   Sno: 2,  
  //   Team: 'NewZeland',  
  //   Match: 8,  
  //   Win: 6,  
  //   Loss: 1,  
  //   Cancel: 1,  
  //   Point: 13  
  
  // },  
  // {  
  //   Sno: '3',  
  //   Team: 'Aus',  
  //   Match: 8,  
  //   Win: 6,  
  //   Loss: 1,  
  //   Cancel: 1,  
  //   Point: 13  
  
  // },  
  // {  
  //   Sno: '4',  
  //   Team: 'England',  
  //   Match: 8,  
  //   Win: 5,  
  //   Loss: 2,  
  //   Cancel: 1,  
  //   Point: 11  
  // },  
  // {  
  //   Sno: '5',  
  //   Team: 'S.Africa',  
  //   Match: 8,  
  //   Win: 4,  
  //   Loss: 3,  
  //   Cancel: 1,  
  //   Point: 9  
  // },  
  // {  
  //   Sno: '6',  
  //   Team: 'Pak',  
  //   Match: 8,  
  //   Win: 4,  
  //   Loss: 4,  
  //   Cancel: 1,  
  //   Point: 9  
  
  // },  
  // {  
  //   Sno: '7',  
  //   Team: 'SriLanka',  
  //   Match: 8,  
  //   Win: 3,  
  //   Loss: 3,  
  //   Cancel: 2,  
  //   Point: 8  
  
  // },  
  // {  
  //   Sno: '8',  
  //   Team: 'Bdesh',  
  //   Match: 8,  
  //   Win: 2,  
  //   Loss: 4,  
  //   Cancel: 2,  
  //   Point: 6  
  
  // }  
  // ];  
}
