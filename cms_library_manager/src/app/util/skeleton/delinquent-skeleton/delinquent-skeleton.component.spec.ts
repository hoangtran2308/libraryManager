import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelinquentSkeletonComponent } from './delinquent-skeleton.component';

describe('DelinquentSkeletonComponent', () => {
  let component: DelinquentSkeletonComponent;
  let fixture: ComponentFixture<DelinquentSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelinquentSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelinquentSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
