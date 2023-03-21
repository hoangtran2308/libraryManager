import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelinquentManagerListComponent } from './delinquent-manager-list.component';

describe('DelinquentManagerListComponent', () => {
  let component: DelinquentManagerListComponent;
  let fixture: ComponentFixture<DelinquentManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelinquentManagerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelinquentManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
