import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticateComponent } from './authenticate/authenticate.component';

const routes: Routes = [
  { path: "login", component: AuthenticateComponent },
  { path: 'application', loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
