import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin/admin.component';
import { ApplicationComponent } from './application.component';
import { CheckInComponent } from './check-in/check-in.component';
import { InFlightComponent } from './in-flight/in-flight.component';
import { ApplicationRoutingModule } from './application-routing.module';

import { UiModule } from '../ui/ui.module';
import { PassengerFormComponent } from './admin/admin-components/passenger-form/passenger-form.component';
import { AncillaryServiceFormComponent } from './admin/admin-components/ancillary-service-form/ancillary-service-form.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    AdminComponent,
    CheckInComponent,
    InFlightComponent,
    PassengerFormComponent,
    AncillaryServiceFormComponent
  ],
  imports: [
    UiModule,
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
