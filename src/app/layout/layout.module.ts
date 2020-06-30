import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

// 
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgDatepickerModule  } from 'ng2-datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


import { CommanModule } from '../comman/comman.module';
import { LayoutRoutingModule } from './layout-routing.module';

import { AddBusinessManagementComponent } from './add-business-management/add-business-management.component';
import { BusinessManagementComponent } from './business-management/business-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { ChangPasswordComponent } from './chang-password/chang-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { NotificationManagementComponent } from './notification-management/notification-management.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SubAdminManagementComponent } from './sub-admin-management/sub-admin-management.component';
import { SubCategoryManagementComponent } from './sub-category-management/sub-category-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ViewBusinessManagementComponent } from './view-business-management/view-business-management.component';
import { AddSubAdminManagementComponent } from './add-sub-admin-management/add-sub-admin-management.component';
import { ViewSubAdminManagementComponent } from './view-sub-admin-management/view-sub-admin-management.component';
import { ViewUserManagementComponent } from './view-user-management/view-user-management.component';
import { AddEventManagementComponent } from './add-event-management/add-event-management.component';
import { ViewEventManagementComponent } from './view-event-management/view-event-management.component';
import { ViewNotificationComponent } from './view-notification/view-notification.component';
import { SupportComponent } from './support/support.component';
import { AnnouncementManagementComponent } from './announcement-management/announcement-management.component';
import { AnnouncementUserListComponent } from './announcement-user-list/announcement-user-list.component';
import { EditSubAdminManagementComponent } from './edit-sub-admin-management/edit-sub-admin-management.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { EditBusinessManagementComponent } from './edit-business-management/edit-business-management.component';
import { EditEventManagementComponent } from './edit-event-management/edit-event-management.component';
import { AgmCoreModule } from '@agm/core';
import { NearBySearchComponent } from './near-by-search/near-by-search.component';
import { ReportComponent } from './report/report.component';



@NgModule({
  declarations: [
    AddBusinessManagementComponent, 
    BusinessManagementComponent, 
    CategoryManagementComponent, 
    ChangPasswordComponent, 
    DashboardComponent, 
    EditProfileComponent, 
    EventManagementComponent, 
    NotificationManagementComponent,
    ProfileComponent, 
    SettingsComponent, 
    SubAdminManagementComponent, 
    SubCategoryManagementComponent, 
    UserManagementComponent,
    ViewBusinessManagementComponent,
    AddSubAdminManagementComponent,
    ViewSubAdminManagementComponent,
    ViewUserManagementComponent,
    AddEventManagementComponent,
    ViewEventManagementComponent,
    ViewNotificationComponent,
    SupportComponent,
    AnnouncementManagementComponent,
    AnnouncementUserListComponent,
    EditSubAdminManagementComponent,
    ActivityLogComponent,
    EditBusinessManagementComponent,
    EditEventManagementComponent,
    NearBySearchComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    CommanModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectCountryModule,
    // BrowserAnimationsModule,
    FlexLayoutModule,
    NgDatepickerModule,
    ChartsModule,
    NgxMaterialTimepickerModule.setLocale('en'),
    AgmCoreModule.forRoot({
      apiKey: 'apikey',
      libraries: ['places']
    })
  ]
})
export class LayoutModule { }
