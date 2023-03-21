import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffManagerListComponent } from './staff-manager-list.component';

describe('StaffManagerListComponent', () => {
  let component: StaffManagerListComponent;
  let fixture: ComponentFixture<StaffManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffManagerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
