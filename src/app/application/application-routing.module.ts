import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ApplicationComponent } from './application.component';
import { CheckInComponent } from './check-in/check-in.component';
import { InFlightComponent } from './in-flight/in-flight.component';

const routes: Routes = [
  { 
    path: '', 
    component: ApplicationComponent,
    children: [
      {
        path: 'admin', 
        component: AdminComponent,
      },
      {
        path: 'check-in', 
        component: CheckInComponent,
      },
      {
        path: 'in-flight', 
        component: InFlightComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
