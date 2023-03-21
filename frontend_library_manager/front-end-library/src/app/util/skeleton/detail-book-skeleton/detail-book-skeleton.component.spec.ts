import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBookSkeletonComponent } from './detail-book-skeleton.component';

describe('DetailBookSkeletonComponent', () => {
  let component: DetailBookSkeletonComponent;
  let fixture: ComponentFixture<DetailBookSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBookSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBookSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
