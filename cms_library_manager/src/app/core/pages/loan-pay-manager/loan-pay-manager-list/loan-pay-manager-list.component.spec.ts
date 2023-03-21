import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPayManagerListComponent } from './loan-pay-manager-list.component';

describe('LoanPayManagerListComponent', () => {
  let component: LoanPayManagerListComponent;
  let fixture: ComponentFixture<LoanPayManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanPayManagerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanPayManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
