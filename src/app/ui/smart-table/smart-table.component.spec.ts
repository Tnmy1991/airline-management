import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UiModule } from '../../ui/ui.module';
import { SmartTableComponent } from './smart-table.component';

describe('SmartTableComponent', () => {
  let component: SmartTableComponent;
  let fixture: ComponentFixture<SmartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, BrowserAnimationsModule, HttpClientTestingModule],
      declarations: [ SmartTableComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
