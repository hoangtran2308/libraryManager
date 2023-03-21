import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookManagerListComponent } from './book-manager-list.component';

describe('BookManagerListComponent', () => {
  let component: BookManagerListComponent;
  let fixture: ComponentFixture<BookManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookManagerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
