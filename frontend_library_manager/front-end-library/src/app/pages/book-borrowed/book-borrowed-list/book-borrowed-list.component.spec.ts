import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBorrowedListComponent } from './book-borrowed-list.component';

describe('BookBorrowedListComponent', () => {
  let component: BookBorrowedListComponent;
  let fixture: ComponentFixture<BookBorrowedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookBorrowedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookBorrowedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
