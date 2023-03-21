import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBookListComponent } from './detail-book-list.component';

describe('DetailBookListComponent', () => {
  let component: DetailBookListComponent;
  let fixture: ComponentFixture<DetailBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
