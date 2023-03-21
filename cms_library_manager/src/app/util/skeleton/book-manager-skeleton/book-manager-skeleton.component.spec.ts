import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookManagerSkeletonComponent } from './book-manager-skeleton.component';

describe('BookManagerSkeletonComponent', () => {
  let component: BookManagerSkeletonComponent;
  let fixture: ComponentFixture<BookManagerSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookManagerSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookManagerSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
