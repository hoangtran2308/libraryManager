import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManagerSkeletonComponent } from './category-manager-skeleton.component';

describe('CategoryManagerSkeletonComponent', () => {
  let component: CategoryManagerSkeletonComponent;
  let fixture: ComponentFixture<CategoryManagerSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryManagerSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryManagerSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
