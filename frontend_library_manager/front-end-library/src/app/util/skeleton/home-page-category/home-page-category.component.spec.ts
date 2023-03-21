import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageCategoryComponent } from './home-page-category.component';

describe('HomePageCategoryComponent', () => {
  let component: HomePageCategoryComponent;
  let fixture: ComponentFixture<HomePageCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
