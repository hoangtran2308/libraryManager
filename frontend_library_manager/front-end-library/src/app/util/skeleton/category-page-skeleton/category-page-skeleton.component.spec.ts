import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPageSkeletonComponent } from './category-page-skeleton.component';

describe('CategoryPageSkeletonComponent', () => {
  let component: CategoryPageSkeletonComponent;
  let fixture: ComponentFixture<CategoryPageSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPageSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
