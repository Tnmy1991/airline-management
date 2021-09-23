import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
    FlexLayoutModule,
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
    FlexLayoutModule,
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
