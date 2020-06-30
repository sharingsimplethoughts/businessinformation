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
export interface PeriodicElement {
  businessid: string;
  name: string;
  contact: number;
  email: string;
  location: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {businessid: 'BHGV5451', name: 'Hydrogen', contact: 9988776655, email: 'xyz@gmial.com', location: 'India', status: 'active'},
  {businessid: 'BHGV5451', name: 'Adrogen', contact: 9988776655, email: 'xyz@gmial.com', location: 'India', status: 'inactive'},
];

@Component({
  selector: 'app-business-management',
  templateUrl: './business-management.component.html',
  styleUrls: ['./business-management.component.css']
})
export class BusinessManagementComponent implements OnInit {

  displayedColumns: string[] = ['businessid', 'name', 'contact', 'email', 'location', 'action']; //'st-date', 'end-date',
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
  
  constructor(
    private auth: AuthenticationService,
    private router:Router,
    private mgmt: ManagementService,
  ) {
    this.fromdate = new Date();
    this.todate = new Date();
  }
  busslist;
  catlist;
  subcatlist;
  tempid;
  file:File;
  ngOnInit() {
    if(!this.auth.isLogin()){
      console.log('Please login to access this page.')
      this.router.navigate(['login']);
    }
    this.mgmt.listBussiness().subscribe(response=>{
      this.busslist = response['data']
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.busslist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.busslist)
    },error=>{
      console.log(error)
    })
    this.mgmt.getBussinessCatList().subscribe(response=>{
      this.catlist = response['data']
    },error=>{
      console.log(error)
    })
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;   
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

  // single = new Array();
  // singleFiles(event) {
  //   console.log('*********************')
  //   const file1 = event.target.files[0]
  //   if(file1){
  //     if(file1.type!="image/jpeg" && file1.type!="image/jpg" && file1.type!="image/png"){
  //       this.loginError("Please upload files of type jpg/jpeg/png");
  //       return false;
  //     }
  //     if(file1.size>1000000000){
  //       this.loginError("Please upload files of maximum 10mb in size");
  //       return false;
  //     }
  //   }
  //   this.single = [];
  //   var singleFiles = event.target.files;
  //   if (singleFiles) {
  //     for (var file of singleFiles) {
  //       var singleReader = new FileReader();
  //       singleReader.onload = (e:any) => {
  //         this.single.push(e.target.result);
  //         document.getElementById("imagefile").setAttribute('src',e.target.result);
  //       }
  //       singleReader.readAsDataURL(file);
  //     }
  //   }
  //   this.picture = event.target.files[0]
  // }
  // singleFiles1(event) {
  //   console.log('*********************')
  //   const file1 = event.target.files[0]
  //   if(file1){
  //     if(file1.type!="image/jpeg" && file1.type!="image/jpg" && file1.type!="image/png"){
  //       this.loginError("Please upload files of type jpg/jpeg/png");
  //       return false;
  //     }
  //     if(file1.size>1000000000){
  //       this.loginError("Please upload files of maximum 10mb in size");
  //       return false;
  //     }
  //   }
  //   this.single = [];
  //   var singleFiles = event.target.files;
  //   if (singleFiles) {
  //     for (var file of singleFiles) {
  //       var singleReader = new FileReader();
  //       singleReader.onload = (e:any) => {
  //         this.single.push(e.target.result);
  //         document.getElementById("imagefile1").setAttribute('src',e.target.result);
  //       }
  //       singleReader.readAsDataURL(file);
  //     }
  //   }
  //   this.picture = event.target.files[0]
  // }
  // validateForm(){
  //   console.log(this.imagePath1)
  //   console.log(this.catname)
    
  //   if(!this.picture || this.picture==''){
  //     this.loginError("Please add subcategory picture");
  //     return false;
  //   }
  //   if(!this.catname || this.catname==''){
  //     this.loginError("Please add subcategory name");
  //     return false;
  //   }

  //   this.catname = this.catname.trim()
  //   if(this.catname.length<2 || this.catname.length>32){
  //     this.loginError("Sub category name must contain in between 2 to 32 characters");
  //     return false;
  //   }

  //   return true
  // }
  // validateForm1(){
  //   if(!this.picture || this.picture==''){
  //     this.loginError("Please add subcategory picture");
  //     return false;
  //   }
  //   if(!this.e_catname || this.e_catname==''){
  //     this.loginError("Please add subcategory name");
  //     return false;
  //   }
  //   this.e_catname = this.e_catname.trim()
  //   if(this.e_catname.length<2 || this.e_catname.length>32){
  //     this.loginError("Sub category name must contain in between 2 to 32 characters");
  //     return false;
  //   }
  //   return true
  // }
  // cleanForm(){
  //   document.getElementById("imagefile").setAttribute('src',"assets/img/upload_icon.png");
  //   this.catname='';
  // }
  idShift(id){
    this.tempid=id;
    console.log(this.tempid);
  }
  // fetchData(id){
  //   this.id = id;
  //   for(var k=0; k<this.catlist.length; k++){
  //     if(this.catlist[k]['id']==id){
  //       this.e_element = this.catlist[k];
  //       console.log(this.e_element)
  //     }
  //   }
  //   for(var k=0; k<this.typelist.length;k++){
  //     if(this.e_element.addtype==this.typelist[k]['name']){
  //       this.e_typeid=k+1;
  //     }
  //   }
  //   // this.e_subcatids=["1","3","5","6"]
  //   this.e_subcatids=[this.e_element.subcategory.toString()]
  // }
  // addCat(){
  //   console.log('--------------')
  //   console.log(this.typeid)
  //   if(this.validateForm()){
  //     let dataToSend = new FormData();
      
  //     dataToSend.append('category_image',this.picture)
  //     dataToSend.append('category_name',this.catname)
  //     dataToSend.append('addtype_id',this.picture)
  //     dataToSend.append('subcategory_id',this.catname)
  //     // this.mgmt.addCategory(dataToSend).subscribe(response=>{
  //     //   console.log(response);
  //     //   this.cleanForm();
  //     //   location.reload();
  //     // },error=>{
  //     //   this.loginError(error.error.message); 
  //     // });
  //   }
  // }
  // editCat(){
  //   console.log(this.e_subcatids)
  //   // if(this.validateForm1()){
  //   //   let dataToSend = new FormData();
  //   //   dataToSend.append('sub_cat_image',this.picture)
  //   //   dataToSend.append('sub_cat_name',this.e_catname)
  //   //   this.mgmt.editCategory(dataToSend,this.id).subscribe(response=>{
  //   //     console.log(response);
  //   //     this.cleanForm();
  //   //     location.reload();
  //   //   },error=>{
  //   //     this.loginError(error.error.message); 
  //   //   });
  //   // }
  // }
  blockEv(){
    this.mgmt.blockBussiness(this.tempid).subscribe(response=>{
      console.log('blocked successfully');
      location.reload();
    },error=>{
      console.log(error.error.message);  
    })
  }
  unblockEv(){
    this.mgmt.unblockBussiness(this.tempid).subscribe(response=>{
      console.log('unblocked successfully');
      location.reload();
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
  // incomingfile(event) {
  //   this.file= event.target.files[0]; 
  // }
  // validateExcel(data){
  //   console.log('inside excel validation')
  //   console.log(data.length)
  //   if(data.length<1){
  //     this.loginError("Excel format is not valid");
  //     return false;
  //   }
  //   var keys = Object.keys(data[0])
  //   if(keys.length!=2){
  //     this.loginError("Excel format is not valid");
  //     return false;
  //   }
  //   // if(!('sub_cat_image' in keys)){

  //   // }
  //   if('sub_cat_image' != keys[0]){
  //     this.loginError("Excel format is not valid");
  //     return false;
  //   }
  //   if('sub_cat_name' != keys[1]){
  //     this.loginError("Excel format is not valid");
  //     return false;
  //   }
  //   for(var k=0; k<data.length; k++){
  //     console.log(data[k]['sub_cat_image'].includes('http'))
  //     if(!data[k]['sub_cat_image'].includes('http')){
  //       this.loginError("Excel data is not valid at row "+(k+1));
  //       return false;
  //     }
  //     if(!data[k]['sub_cat_name'] || data[k]['sub_cat_name']==''){
  //       this.loginError("Excel data is not valid at row "+(k+1));
  //       return false;
  //     }
  //     if(data[k]['sub_cat_name'].length<2 || data[k]['sub_cat_name'].length>32){
  //       this.loginError("Excel data length exceeding(must be between 2 to 32 characters) at row "+(k+1));
  //       return false;
  //     }
  //   }
  //   return true
  // }
  // importData(){
  //   let fileReader = new FileReader();
  //     fileReader.onload = (e) => {
  //       this.arrayBuffer = fileReader.result;
  //       var data = new Uint8Array(this.arrayBuffer);
  //       var arr = new Array();
  //       for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  //       var bstr = arr.join("");
  //       var workbook = XLSX.read(bstr, {type:"binary"});
  //       var first_sheet_name = workbook.SheetNames[0];
  //       var worksheet = workbook.Sheets[first_sheet_name];
  //       var meu = XLSX.utils.sheet_to_json(worksheet,{raw:true});
  //       console.log(meu)
  //       if(this.validateExcel(meu)){
  //         for(var k=0; k<meu.length; k++){
  //           var d = {
  //             sub_cat_image: meu[k]['sub_cat_image'],
  //             sub_cat_name: meu[k]['sub_cat_name']
  //           }
  //           this.mgmt.addSubcategory(d).subscribe(response=>{
  //             console.log(response);
  //             location.reload();
  //           },error=>{
  //             this.loginError(error.error.message); 
  //           });
  //         }
  //       }
  //     }
  //     fileReader.readAsArrayBuffer(this.file);
  // }

  errormessage;
  successmessage;
  loginError(e) {
    console.log(e);
    this.errormessage = e;
    setTimeout(() => {
      this.errormessage = "";
    }, 4000);
  }
  loginSuccess(e) {
    console.log(e);
    this.successmessage = e;
    setTimeout(() => {
      this.successmessage = "";
    }, 4000);
  }

}
