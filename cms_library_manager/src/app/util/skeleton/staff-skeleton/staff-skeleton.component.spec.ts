import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSkeletonComponent } from './staff-skeleton.component';

describe('StaffSkeletonComponent', () => {
  let component: StaffSkeletonComponent;
  let fixture: ComponentFixture<StaffSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
