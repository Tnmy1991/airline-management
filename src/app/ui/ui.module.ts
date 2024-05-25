import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';

import { FlightPipePipe } from './pipes/flight-pipe.pipe';
import { ServicePipePipe } from './pipes/service-pipe.pipe';
import { PropertyGetterPipe } from './pipes/property-getter.pipe';
import { LazyImageDirective } from './directives/lazy-image.directive';
import { SeatMarkingDirective } from './directives/seat-marking.directive';

import { HeaderComponent } from './layout/header/header.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { PageLayoutComponent } from './layout/page-layout/page-layout.component';
import { SeatingLayoutComponent } from './seating-layout/seating-layout.component';
import { TooltipLayoutComponent } from './tooltip-layout/tooltip-layout.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AuthLayoutComponent,
    SmartTableComponent,
    PageLayoutComponent,
    FlightPipePipe,
    PropertyGetterPipe,
    FilterPanelComponent,
    ServicePipePipe,
    SeatingLayoutComponent,
    SeatMarkingDirective,
    TooltipLayoutComponent,
    FlightDetailsComponent,
    LazyImageDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    OverlayModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatMenuModule,
    MatAutocompleteModule
  ],
  exports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatPaginatorModule,
    HeaderComponent,
    MatSelectModule,
    AuthLayoutComponent,
    SmartTableComponent,
    PageLayoutComponent,
    ReactiveFormsModule,
    FlightPipePipe,
    PropertyGetterPipe,
    MatBottomSheetModule,
    MatDialogModule,
    FilterPanelComponent,
    MatFormFieldModule,
    MatInputModule,
    ServicePipePipe,
    SeatingLayoutComponent,
    SeatMarkingDirective,
    OverlayModule,
    TooltipLayoutComponent,
    MatSlideToggleModule,
    MatSidenavModule,
    MatMenuModule,
    MatAutocompleteModule,
    FlightDetailsComponent
  ]
})
export class UiModule { }
