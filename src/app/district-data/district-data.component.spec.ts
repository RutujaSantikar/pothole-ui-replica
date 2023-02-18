import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictDataComponent } from './district-data.component';

describe('DistrictDataComponent', () => {
  let component: DistrictDataComponent;
  let fixture: ComponentFixture<DistrictDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
