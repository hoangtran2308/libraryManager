import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorManagerListComponent } from './author-manager-list.component';

describe('AuthorManagerListComponent', () => {
  let component: AuthorManagerListComponent;
  let fixture: ComponentFixture<AuthorManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorManagerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
