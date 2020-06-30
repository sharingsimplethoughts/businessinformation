import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  
  { 
    path: '', 
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) 
  }, 
  { 
    path: 'home', 
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) 
  },
  { 
    path: '**', 
    component: PageNotFoundComponent
  },
  // {path:'profile', component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
