import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPaySkeletonComponent } from './loan-pay-skeleton.component';

describe('LoanPaySkeletonComponent', () => {
  let component: LoanPaySkeletonComponent;
  let fixture: ComponentFixture<LoanPaySkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanPaySkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanPaySkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
