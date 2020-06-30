import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})


export class ManagementService {
  
  constructor(private router: Router, private http: HttpClient) { }
  isLogin() {
    var token = localStorage.getItem('currentUser');
    if (token)
      return true;
    else
      false;
  }

  // Change Password -----------------------------------------
  changePassword(data){
    return this.http.put(environment.baseUrl2 + 'admin/users/admin_profile/change_password',data);
  }
  
  getUserList() {
    return this.http.get(environment.baseUrl2 + 'admin/user_management/user_list');
  }
  getUserListByDate(data){
    return this.http.post(environment.baseUrl2 + 'admin/user_management/user_filterd_list',data);
  }
  getUserBasicDetail(id) {
    return this.http.get(environment.baseUrl2 + 'admin/user_management/user/profile/basic/'+id);
  }
  blockUser(id){
    return this.http.post(environment.baseUrl2 + 'admin/user_management/user/block/'+id,null);
  }
  unblockUser(id){
    return this.http.post(environment.baseUrl2 + 'admin/user_management/user/unblock/'+id,null);
  }


  //Settings services**************************
  getLegal(){
    return this.http.get(environment.baseUrl2 + 'admin/user_management/settings/legal');
  }
  getTerms(){
    return this.http.get(environment.baseUrl2 + 'admin/user_management/settings/terms_conditions');
  }
  getHelp(){
    return this.http.get(environment.baseUrl2 + 'admin/user_management/settings/help');
  }
  getAbout(){
    return this.http.get(environment.baseUrl2 + 'admin/user_management/settings/about_us');
  }
  getPrivacyPolicy(){
    return this.http.get(environment.baseUrl2 + 'admin/user_management/settings/privacy_policy');
  }
  // getFaq(){
  //   return this.http.get(environment.baseUrl2 + 'admin/user_management/settings/legal/1');
  // }
  
  

  updateLegal(data,id){
    return this.http.put(environment.baseUrl2 + 'admin/user_management/settings/legal/'+id,data);
  }
  updateTerms(data,id){
    return this.http.put(environment.baseUrl2 + 'admin/user_management/settings/terms_conditions/'+id,data);
  }
  updateHelp(data,id){
    return this.http.put(environment.baseUrl2 + 'admin/user_management/settings/help/'+id,data);
  }
  updateAbout(data,id){
    return this.http.put(environment.baseUrl2 + 'admin/user_management/settings/about_us/'+id,data);
  }
  setFaq(data){
    return this.http.put(environment.baseUrl2 + 'admin/user_management/settings/faq/create',data);
  }
  updateFaq(data){
    return this.http.put(environment.baseUrl2 + 'admin/user_management/settings/faq/update/3',data);
  }
  updatePrivacyPolicy(data,id){
    return this.http.put(environment.baseUrl2 + 'admin/user_management/settings/privacy_policy/'+id,data);
  }



  //Subcategory Management Services *************************
  addSubcategory(data){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/add_subcategory',data)
  }
  editSubcategory(data,id){
    return this.http.put(environment.baseUrl2 + 'admin/category_management/subcategory_update/'+id,data)
  }
  blockSubcategory(id){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/block_subcategory/'+id,null)
  }
  unblockSubcategory(id){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/unblock_subcategory/'+id,null)
  }
  listSubcategory(){
    return this.http.get(environment.baseUrl2 + 'admin/category_management/subcategory_list')
  }



  //Category Management------------------
  addCategory(data){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/add_category',data)
  }
  editCategory(data,id){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/category_update/'+id,data)
  }
  blockCategory(id){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/block_category/'+id,null)
  }
  unblockCategory(id){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/unblock_category/'+id,null)
  }
  listCategory(){
    return this.http.get(environment.baseUrl2 + 'admin/category_management/category_list')
  }
  listTypes(){
    return this.http.get(environment.baseUrl2 + 'admin/category_management/add_type_list')
  }

  //Event Management----------------------
  addEvent(data){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/add_event',data)
  }
  editEvent(data,id){
    return this.http.put(environment.baseUrl2 + 'admin/category_management/event_update/'+id,data)
  }
  blockEvent(id){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/block_event/'+id,null)
  }
  unblockEvent(id){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/unblock_event/'+id,null)
  }
  listEvent(){
    return this.http.get(environment.baseUrl2 + 'admin/category_management/event_list')
  }
  getEventCatList(){
    return this.http.get(environment.baseUrl2 + 'admin/category_management/event_category_list')
  }
  getEventSubcatList(id){
    return this.http.get(environment.baseUrl2 + 'admin/category_management/event_subcategory_list/'+id)
  }
  getEventDetail(id){
    return this.http.get(environment.baseUrl2 + 'admin/category_management/get_single_event/'+id)
  }

  //Bussiness Management----------------------
  addBussiness(data){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/add_business',data)
  }
  editBussiness(data,id){
    return this.http.put(environment.baseUrl2 + 'admin/category_management/business_update/'+id,data)
  }
  blockBussiness(id){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/block_business/'+id,null)
  }
  unblockBussiness(id){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/unblock_business/'+id,null)
  }
  listBussiness(){
    return this.http.get(environment.baseUrl2 + 'admin/category_management/business_list')
  }
  getBussinessCatList(){
    return this.http.get(environment.baseUrl2 + 'admin/category_management/business_category_list')
  }
  getBussinessSubcatList(id){
    return this.http.get(environment.baseUrl2 + 'admin/category_management/business_subcategory_list/'+id)
  }
  getBussinessDetail(id){
    return this.http.get(environment.baseUrl2 + 'admin/category_management/get_specific_business/'+id)
  }

//Near by search----------------------------------------------
  listPlaceTypes(){
    return this.http.get(environment.baseUrl2 + 'admin/category_management/place_type_list')
  }
  searchNearbyBusiness(data){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/nearby_search_business',data)
  }
  addNearbuBusiness(data){
    return this.http.post(environment.baseUrl2 + 'admin/category_management/add_nearby_business',data)
  }

}



