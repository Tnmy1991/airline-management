import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiModule } from '../ui.module';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FilterPanelComponent } from './filter-panel.component';

describe('FilterPanelComponent', () => {
  let bottomSheet: MatBottomSheet;
  let component: FilterPanelComponent;
  let fixture: ComponentFixture<FilterPanelComponent>;
  const dialogMockRef = {
    close: () => {},
  };
  const mockData = {
    title: 'Test Filter',
    meta: [
      {
        label: 'Mandatory Requirements',
        field: 'mandatory_requirements',
        selected: 'none',
        options: [
          {
            value: 'none',
            label: 'Show All'
          },
          {
            value: 'address',
            label: 'Address'
          },
          {
            value: 'passport_number',
            label: 'Passport Number'
          },
          {
            value: 'date_of_birth',
            label: 'Date of Birth'
          }
        ]
      }
    ],
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, BrowserAnimationsModule],
      declarations: [ FilterPanelComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatBottomSheetRef, useValue: dialogMockRef },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockData },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPanelComponent);
    component = fixture.componentInstance;
    bottomSheet = TestBed.inject(MatBottomSheet);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
