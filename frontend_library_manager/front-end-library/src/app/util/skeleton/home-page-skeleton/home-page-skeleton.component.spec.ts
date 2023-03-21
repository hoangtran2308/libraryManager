import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSkeletonComponent } from './home-page-skeleton.component';

describe('HomePageSkeletonComponent', () => {
  let component: HomePageSkeletonComponent;
  let fixture: ComponentFixture<HomePageSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
