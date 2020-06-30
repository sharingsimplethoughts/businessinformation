import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityLogComponent } from './activity-log/activity-log.component';
import { AddBusinessManagementComponent } from './add-business-management/add-business-management.component';
import { AddEventManagementComponent } from './add-event-management/add-event-management.component';
import { AddSubAdminManagementComponent } from './add-sub-admin-management/add-sub-admin-management.component';
import { BusinessManagementComponent } from './business-management/business-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { SubCategoryManagementComponent } from './sub-category-management/sub-category-management.component';
import { ChangPasswordComponent } from './chang-password/chang-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditBusinessManagementComponent } from './edit-business-management/edit-business-management.component';
import { EditEventManagementComponent } from './edit-event-management/edit-event-management.component';
import { EditSubAdminManagementComponent } from './edit-sub-admin-management/edit-sub-admin-management.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { NotificationManagementComponent } from './notification-management/notification-management.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SubAdminManagementComponent } from './sub-admin-management/sub-admin-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ViewBusinessManagementComponent } from './view-business-management/view-business-management.component';
import { ViewEventManagementComponent } from './view-event-management/view-event-management.component';
import { ViewSubAdminManagementComponent } from './view-sub-admin-management/view-sub-admin-management.component';
import { ViewUserManagementComponent } from './view-user-management/view-user-management.component';
import { NearBySearchComponent } from './near-by-search/near-by-search.component';
import { SupportComponent } from './support/support.component';
import { ReportComponent } from './report/report.component';


const routes: Routes = [
  {path: 'activity-log', component: ActivityLogComponent },
  {path: 'add-business-management', component: AddBusinessManagementComponent },
  {path: 'add-event-management', component: AddEventManagementComponent },
  {path: 'add-sub-admin-management', component: AddSubAdminManagementComponent },
  {path: 'business-management', component: BusinessManagementComponent },
  {path: 'category-management', component: CategoryManagementComponent },
  {path: 'sub-category-management', component: SubCategoryManagementComponent },
  {path: 'change-password', component: ChangPasswordComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'edit-business-management/:id', component: EditBusinessManagementComponent },
  {path: 'edit-event-management/:id', component: EditEventManagementComponent },
  {path: 'edit-profile', component: EditProfileComponent },
  {path: 'edit-sub-admin-management', component: EditSubAdminManagementComponent },
  {path: 'event-management', component: EventManagementComponent },
  {path: 'notification-management', component: NotificationManagementComponent },
  {path: 'profile', component: ProfileComponent },
  {path: 'setting', component: SettingsComponent },
  {path: 'sub-admin-management', component: SubAdminManagementComponent },
  {path: 'user-management', component: UserManagementComponent },
  {path: 'view-business-management/:id', component: ViewBusinessManagementComponent },
  {path: 'view-event-management/:id', component: ViewEventManagementComponent },
  {path: 'view-sub-admin-management', component: ViewSubAdminManagementComponent },
  {path: 'view-user-management/:id', component: ViewUserManagementComponent },
  {path: 'near-by-search', component: NearBySearchComponent },
  {path: 'support', component: SupportComponent },
  {path: 'report-management', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
