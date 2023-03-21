import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccManagerSkeletonComponent } from './acc-manager-skeleton.component';

describe('AccManagerSkeletonComponent', () => {
  let component: AccManagerSkeletonComponent;
  let fixture: ComponentFixture<AccManagerSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccManagerSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccManagerSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
