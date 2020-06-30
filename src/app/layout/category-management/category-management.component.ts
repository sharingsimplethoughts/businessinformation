import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ManagementService } from 'src/app/layout/service/management.service'; 
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx'; 
declare var $:any;

export interface PeriodicElement {
  catId: string;
  name: string;
  allocated: string;
  mostSearch: string;
  business: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {catId: '#DFGHJK845612', name: 'Hydrogen', allocated: 'John Deo', mostSearch: 'Lorem ipsum', business: 'Restaurant'},
];

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  errormessage;
  successmessage;
  catname;
  subcatids;
  typeid;

  picture;
  imagefile;
  catlist;
  tempid;
  e_element={
    addtype: "",
    category_image: "",
    category_name: "",
    id: 1,
    is_active: true,
    subcategory: 3
  };
  e_catname;
  e_subcatids;
  e_typeid;

  id;
  arrayBuffer:any;
  file:File;
  is_hidden=true;
  typelist;
  subcatlist;

  displayedColumns: string[] = ['catId', 'name', 'image', 'adtype', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  public imagePath;
  public imagePath1;
  public imagePath2;
  editImgURL: any;
  addImgURL: any;
  addSubImgURL: any;

  constructor(
    private auth: AuthenticationService,
    private router:Router,
    private mgmt: ManagementService,
  ) { }
  ngOnInit() {
    if(!this.auth.isLogin()){
      console.log('Please login to access this page.')
      this.router.navigate(['login']);
    }
    this.mgmt.listCategory().subscribe(response=>{
      this.catlist = response['data']
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.catlist);
      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      console.log(this.catlist)
    },error=>{
      console.log(error)
      // swal("", error.error['message'],'error')
    })
    this.mgmt.listTypes().subscribe(response=>{
      this.typelist = response['data']
    },error=>{
      console.log(error)
    })
    this.mgmt.listSubcategory().subscribe(response=>{
      this.subcatlist = response['data']
    },error=>{
      console.log(error)
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
    this.dataSource.paginator = this.paginator;
  }
  
  // Add Category Image
  addCateImg(files) {
    var reader = new FileReader();
    this.imagePath1 = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.addImgURL = reader.result; 
    }
  }
  // Edit Category Image
  editCateImg(files) {
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.editImgURL = reader.result; 
    }
  }
  // Edit Category Image
  addSubImg(files) {
    var reader = new FileReader();
    this.imagePath2 = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.addSubImgURL = reader.result; 
    }
  }




  single = new Array();
  singleFiles(event) {
    console.log('*********************')
    const file1 = event.target.files[0]
    if(file1){
      if(file1.type!="image/jpeg" && file1.type!="image/jpg" && file1.type!="image/png"){
        this.loginError("Please upload files of type jpg/jpeg/png");
        return false;
      }
      if(file1.size>1000000000){
        this.loginError("Please upload files of maximum 10mb in size");
        return false;
      }
    }
    this.single = [];
    var singleFiles = event.target.files;
    if (singleFiles) {
      for (var file of singleFiles) {
        var singleReader = new FileReader();
        singleReader.onload = (e:any) => {
          this.single.push(e.target.result);
          document.getElementById("imagefile").setAttribute('src',e.target.result);
        }
        singleReader.readAsDataURL(file);
      }
    }
    this.picture = event.target.files[0]
  }
  singleFiles1(event) {
    console.log('*********************')
    const file1 = event.target.files[0]
    if(file1){
      if(file1.type!="image/jpeg" && file1.type!="image/jpg" && file1.type!="image/png"){
        this.loginError("Please upload files of type jpg/jpeg/png");
        return false;
      }
      if(file1.size>1000000000){
        this.loginError("Please upload files of maximum 10mb in size");
        return false;
      }
    }
    this.single = [];
    var singleFiles = event.target.files;
    if (singleFiles) {
      for (var file of singleFiles) {
        var singleReader = new FileReader();
        singleReader.onload = (e:any) => {
          this.single.push(e.target.result);
          document.getElementById("imagefile1").setAttribute('src',e.target.result);
        }
        singleReader.readAsDataURL(file);
      }
    }
    this.picture = event.target.files[0]
  }
  validateForm(){
    console.log(this.imagePath1)
    console.log(this.catname)
    
    if(!this.picture || this.picture==''){
      this.loginError("Please add category picture");
      return false;
    }
    if(!this.catname || this.catname==''){
      this.loginError("Please add category name");
      return false;
    }

    this.catname = this.catname.trim()
    if(this.catname.length<2 || this.catname.length>32){
      this.loginError("Category name must contain in between 2 to 32 characters");
      return false;
    }
    if(!this.subcatids || this.subcatids==''){
      this.loginError("Please select sucategories");
      return false;
    }
    if(!this.typeid || this.typeid==''){
      this.loginError("Please select type");
      return false;
    }

    return true
  }
  validateForm1(){
    // if(!this.picture || this.picture==''){
    //   this.loginError("Please add category picture");
    //   return false;
    // }
    if(!this.e_catname || this.e_catname==''){
      this.loginError("Please add category name");
      return false;
    }
    this.e_catname = this.e_catname.trim()
    if(this.e_catname.length<2 || this.e_catname.length>32){
      this.loginError("Category name must contain in between 2 to 32 characters");
      return false;
    }
    if(!this.e_subcatids || this.e_subcatids==''){
      this.loginError("Please select sucategories");
      return false;
    }
    if(!this.e_typeid || this.e_typeid==''){
      this.loginError("Please select type");
      return false;
    }
    return true
  }
  cleanForm(){
    document.getElementById("imagefile").setAttribute('src',"assets/img/upload_icon.png");
    this.catname='';
  }
  idShift(id){
    this.tempid=id;
    console.log(this.tempid);
  }
  fetchData(id){
    this.id = id;
    for(var k=0; k<this.catlist.length; k++){
      if(this.catlist[k]['id']==id){
        this.e_element = this.catlist[k];
        console.log(this.e_element)
      }
    }
    for(var k=0; k<this.typelist.length;k++){
      if(this.e_element.addtype==this.typelist[k]['name']){
        this.e_typeid=k+1;
      }
    }
    // this.e_subcatids=["1","3","5","6"]
    var t,n;
    n=[]
    t=this.e_element['subcategory'];
    for(var k=0;k<t.length;k++){
      n[k]=t[k].id.toString();
    }
    this.e_subcatids=n;
  }
  addCat(){
    var sids = '';
    if(this.validateForm()){
      for(var i=0;i<this.subcatids.length;i++){
        sids = sids+this.subcatids[i]+','
      }
      sids = sids.substr(0,sids.length-1)
      let dataToSend = new FormData();
      
      dataToSend.append('category_image',this.picture)
      dataToSend.append('category_name',this.catname)
      dataToSend.append('addtype_id',this.typeid)
      dataToSend.append('subcategory_id',sids)
      this.mgmt.addCategory(dataToSend).subscribe(response=>{
        console.log(response);
        this.cleanForm();
        location.reload();
      },error=>{
        this.loginError(error.error.message); 
      });
    }
  }
  editCat(){
    console.log(this.e_subcatids)
    var sids = '';
    if(this.validateForm1()){
      let dataToSend = new FormData();
      for(var i=0;i<this.e_subcatids.length;i++){
        sids = sids+this.e_subcatids[i]+','
      }
      sids = sids.substr(0,sids.length-1)
      if(!this.picture || this.picture==''){
        dataToSend.append('category_image','')  
      }
      else{
        dataToSend.append('category_image',this.picture)
      }
      dataToSend.append('category_name',this.catname)
      dataToSend.append('addtype_id',this.e_typeid)
      dataToSend.append('subcategory_id',sids)
      console.log(dataToSend)
      this.mgmt.editCategory(dataToSend,this.id).subscribe(response=>{
        console.log(response);
        this.cleanForm();
        location.reload();
      },error=>{
        this.loginError(error.error.message); 
      });
    }
  }
  blockCat(){
    this.mgmt.blockCategory(this.tempid).subscribe(response=>{
      console.log('blocked successfully');
      location.reload();
    },error=>{
      console.log(error.error.message);  
    })
  }
  unblockCat(){
    this.mgmt.unblockCategory(this.tempid).subscribe(response=>{
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
  incomingfile(event) {
    this.file= event.target.files[0]; 
    this.is_hidden=false;
  }
  validateExcel(data){
    console.log('inside excel validation')
    console.log(data.length)
    if(data.length<1){
      this.loginError("Excel format is not valid");
      return false;
    }
    var keys = Object.keys(data[0])
    if(keys.length!=2){
      this.loginError("Excel format is not valid");
      return false;
    }
    // if(!('sub_cat_image' in keys)){

    // }
    if('sub_cat_image' != keys[0]){
      this.loginError("Excel format is not valid");
      return false;
    }
    if('sub_cat_name' != keys[1]){
      this.loginError("Excel format is not valid");
      return false;
    }
    for(var k=0; k<data.length; k++){
      console.log(data[k]['sub_cat_image'].includes('http'))
      if(!data[k]['sub_cat_image'].includes('http')){
        this.loginError("Excel data is not valid at row "+(k+1));
        return false;
      }
      if(!data[k]['sub_cat_name'] || data[k]['sub_cat_name']==''){
        this.loginError("Excel data is not valid at row "+(k+1));
        return false;
      }
      if(data[k]['sub_cat_name'].length<2 || data[k]['sub_cat_name'].length>32){
        this.loginError("Excel data length exceeding(must be between 2 to 32 characters) at row "+(k+1));
        return false;
      }
    }
    return true
  }
  importData(){
    let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        var meu = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        console.log(meu)
        if(this.validateExcel(meu)){
          for(var k=0; k<meu.length; k++){
            var d = {
              sub_cat_image: meu[k]['sub_cat_image'],
              sub_cat_name: meu[k]['sub_cat_name']
            }
            this.mgmt.addSubcategory(d).subscribe(response=>{
              console.log(response);
              location.reload();
            },error=>{
              this.loginError(error.error.message); 
            });
          }
        }
      }
      fileReader.readAsArrayBuffer(this.file);
  }



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