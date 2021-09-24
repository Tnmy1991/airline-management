import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatingLayoutComponent } from './seating-layout.component';

describe('SeatingLayoutComponent', () => {
  let component: SeatingLayoutComponent;
  let fixture: ComponentFixture<SeatingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatingLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
