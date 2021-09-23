import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { UiModule } from '../../../../ui/ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AncillaryServiceFormComponent } from './ancillary-service-form.component';

describe('AncillaryServiceFormComponent', () => {
  let component: AncillaryServiceFormComponent;
  let fixture: ComponentFixture<AncillaryServiceFormComponent>;
  const dialogMock = {
    close: () => {},
  };
  const mockData = {
    flight_number: 'test-123',
    services_data: {
      id: 'fd751559-ebc2-4e62-90cc-3d5bef5c1e44',
      name: 'Masala Tea',
      type: 'ANC_SER',
      price: '100',
      flight_id: ''
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [ AncillaryServiceFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AncillaryServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();
    expect(component.title).toEqual('Edit Service');
  });

  describe('perform form fields verification', () => {
    it('name should contain "Masala Tea"', () => {
      const field = component.serviceForm.controls['name'];
      expect(field.value).toEqual('Masala Tea');
    });

    it('type should contain "ANC_SER"', () => {
      const field = component.serviceForm.controls['type'];
      expect(field.value).toEqual('ANC_SER');
    });

    it('price should contain "100"', () => {
      const field = component.serviceForm.controls['price'];
      expect(field.value).toEqual('100');
    });
  });
});
