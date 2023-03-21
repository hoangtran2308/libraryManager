import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManagerListComponent } from './category-manager-list.component';

describe('CategoryManagerListComponent', () => {
  let component: CategoryManagerListComponent;
  let fixture: ComponentFixture<CategoryManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryManagerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
