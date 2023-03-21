import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingSkeletonComponent } from './publishing-skeleton.component';

describe('PublishingSkeletonComponent', () => {
  let component: PublishingSkeletonComponent;
  let fixture: ComponentFixture<PublishingSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishingSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishingSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
